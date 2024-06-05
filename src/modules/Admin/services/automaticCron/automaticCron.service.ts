import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '@nestjs/axios'
import { AdminReadModel } from '../../models/admin.read'
import { firstValueFrom } from 'rxjs'
import { AdminUpdateModel } from '../../models/admin.update'
import { AdminCreateModel } from '../../models/admin.create'
import { Wallets } from '../../DTO/wallet.dto'

interface CriptoData {
  id: string
  precoAtual: string
  quantidade: string
  valorInvestido?: string
  wallet?: string
}

@Injectable()
export class AutomaticCronService {
  constructor(
    private readonly adminReadModel: AdminReadModel,
    private readonly adminUpdateModel: AdminUpdateModel,
    private readonly adminCreateModel: AdminCreateModel,
    private readonly httpService: HttpService,
  ) {}

  public async fetchAndSaveCryptocurrencyData() {
    const criptoDatas = await this.adminReadModel.getAllCriptoData()
    if (criptoDatas.length !== 0) {
      const ids = criptoDatas.map((data) => data.idCMC.toString())
      const convert = 'USD'
      const baseUrl =
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
      const apiKey = process.env.CMC_API_KEY
      const queryString = `?id=${ids.join(',')}&convert=${convert}`
      const options = {
        headers: { 'X-CMC_PRO_API_KEY': apiKey },
      }

      try {
        const response = await firstValueFrom(
          this.httpService.get(baseUrl + queryString, options),
        )
        const data = response.data

        const values = ids
          .map((id) => {
            if (data.data && data.data[id]) {
              const coinData = data.data[id]
              return {
                idCMC: coinData.id,
                name: coinData.symbol,
                price: coinData.quote[convert].price,
              }
            } else {
              return null
            }
          })
          .filter((v) => v !== null)

        for (const value of values) {
          await this.adminUpdateModel.updateCriptoNameAndPrice(
            value.idCMC,
            value.name,
            value.price,
          )
        }
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error)
      }
    }
  }

  public async fetchAndSaveCryptocurrencyImage() {
    const criptoDatas = await this.adminReadModel.getAllCriptoData()
    if (criptoDatas.length !== 0) {
      const ids = criptoDatas.map((data) => data.idCMC.toString())

      const baseUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info'
      const apiKey = process.env.CMC_API_KEY
      const queryString = `?id=${ids.join(',')}&skip_invalid=true`
      const options = {
        headers: { 'X-CMC_PRO_API_KEY': apiKey },
      }

      try {
        const response = await firstValueFrom(
          this.httpService.get(baseUrl + queryString, options),
        )
        const data = response.data

        const values = ids.map((id) => {
          if (data.data && data.data[id]) {
            const coinData = data.data[id]
            return {
              idCMC: parseInt(id, 10),
              imagem: coinData.logo || '',
            }
          } else {
            return {
              idCMC: parseInt(id, 10),
              imagem: '',
            }
          }
        })

        for (const value of values) {
          await this.adminUpdateModel.updateCriptoImage(
            value.idCMC,
            value.imagem,
          )
        }
      } catch (error) {
        console.error(
          'Error fetching cryptocurrency image:',
          error.response?.data || error,
        )
      }
    }
  }

  private async updateVies() {
    const criptoDatas =
      await this.adminReadModel.getAllCriptoDataWhereAllocationAndCurrentAllocationIsNotNull()

    for (const cripto of criptoDatas) {
      const alocacao = parseFloat(cripto.alocacao)
      const alocacaoAtual = parseFloat(cripto.alocacaoAtual)

      // Define o viés baseado na comparação entre a alocação atual e a alocação
      let vies
      if (alocacaoAtual > alocacao) {
        vies = 'realocar vendendo'
      } else if (alocacaoAtual < alocacao) {
        vies = 'realocar comprando'
      } else {
        // Se a alocação atual for igual à alocação, não há necessidade de realocar
        vies = 'manter'
      }

      this.adminUpdateModel.updateBias(cripto.id, vies)
    }

    return { message: 'Viés atualizado com sucesso.' }
  }

  private async calculateRentability() {
    const criptoDatas =
      await this.adminReadModel.getAllCriptoDataWherePriceAndEntryIsNotNull()

    for (const cripto of criptoDatas) {
      const precoAtual = parseFloat(cripto.precoAtual)
      const entrada = parseFloat(cripto.entrada)

      // Calcula a rentabilidade
      const rentabilidade = ((precoAtual - entrada) / entrada) * 100

      await this.adminUpdateModel.updateRentability(cripto.id, rentabilidade)
    }

    return { message: 'Rentabilidade calculada e atualizada com sucesso.' }
  }

  private async calculateCurrentAllocation() {
    const criptoDatas =
      await this.adminReadModel.getAllCriptoDataWherePriceAndQuantityIsNotNull()

    // Definindo o tipo de walletGroups
    const walletGroups: Record<string, CriptoData[]> = criptoDatas.reduce(
      (groups, cripto) => {
        const key = cripto.wallet || 'default' // Assumindo 'default' para quando não houver wallet definida
        groups[key] = groups[key] || []
        groups[key].push(cripto)
        return groups
      },
      {},
    )

    // Processar cada grupo de carteira
    for (const [wallet, criptos] of Object.entries(walletGroups)) {
      let totalInvestedValue = 0

      // Calcular o total investido para a carteira atual
      for (const cripto of criptos) {
        const precoAtual = parseFloat(cripto.precoAtual)
        const quantidade = parseFloat(cripto.quantidade)
        const valorInvestido = quantidade * precoAtual
        totalInvestedValue += valorInvestido

        // Atualizar o valor investido no banco de dados
        await this.adminUpdateModel.updateValueInvestment(
          cripto.id,
          valorInvestido,
        )
      }

      // Calcular e atualizar a alocação atual para cada ativo na carteira
      for (const cripto of criptos) {
        const valorInvestido = parseFloat(cripto.valorInvestido || '0')
        const alocacaoAtual = (valorInvestido / totalInvestedValue) * 100

        await this.adminUpdateModel.updateAlocationCurrent(
          cripto.id,
          alocacaoAtual,
        )
      }
    }

    return {
      message:
        'Alocação atual calculada e atualizada com sucesso para cada carteira.',
    }
  }

  async calculateProfitForGraph(wallet: Wallets) {
    try {
      const criptoDatas =
        await this.adminReadModel.getAllCriptoDataFiltred(wallet)

      if (!criptoDatas.length) {
        throw new HttpException(
          'Nenhuma criptomoeda encontrada para a carteira especificada',
          HttpStatus.NOT_FOUND,
        )
      }

      const totalInvested = criptoDatas.reduce(
        (acc, cripto) => acc + parseFloat(cripto.valorInvestido),
        0,
      )
      const baseInvestment = 2000
      const rendimento =
        ((totalInvested - baseInvestment) / baseInvestment) * 100

      await this.adminCreateModel.addProfitAndDateInGraph(
        rendimento.toString(),
        wallet,
      )

      return { totalInvested, rendimento }
    } catch (error) {
      console.error('Erro ao calcular a rentabilidade para o gráfico:', error)
      throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Cron('0 0 */7 * *')
  async handleCronFetchAndSaveCriptoImage() {
    await this.fetchAndSaveCryptocurrencyImage()
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCronFetchAndSaveCriptoData() {
    await this.fetchAndSaveCryptocurrencyData()
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    await this.calculateRentability()
    await this.calculateCurrentAllocation()
    await this.calculateProfitForGraph('CONSERVADORA')
  }
}
