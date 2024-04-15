import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '@nestjs/axios'
import { AdminReadModel } from '../../models/admin.read'
import { firstValueFrom } from 'rxjs'
import { AdminUpdateModel } from '../../models/admin.update'

@Injectable()
export class AutomaticCronService {
  constructor(
    private readonly adminReadModel: AdminReadModel,
    private readonly adminUpdateModel: AdminUpdateModel,
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
    let totalInvestedValue = 0

    const criptoDatas =
      await this.adminReadModel.getAllCriptoDataWherePriceAndQuantityIsNotNull()

    // Primeira passagem para calcular o total investido
    for (const cripto of criptoDatas) {
      const precoAtual = parseFloat(cripto.precoAtual)
      const quantidade = parseFloat(cripto.quantidade)

      const valorInvestido = quantidade * precoAtual
      totalInvestedValue += valorInvestido

      await this.adminUpdateModel.updateValueInvestment(
        cripto.id,
        valorInvestido,
      )
    }

    // totalInvestedValue agora representa o valor total da carteira
    const totalPortfolioValue = totalInvestedValue

    // Segunda passagem para calcular e atualizar a alocação atual
    for (const cripto of criptoDatas) {
      const valorInvestido = parseFloat(cripto.valorInvestido)
      const alocacaoAtual = (valorInvestido / totalPortfolioValue) * 100 // Porcentagem do total da carteira

      await this.adminUpdateModel.updateAlocationCurrent(
        cripto.id,
        alocacaoAtual,
      )
    }

    return {
      totalPortfolioValue,
      totalInvestedValue: totalPortfolioValue, // totalInvestedValue é agora igual ao totalPortfolioValue
      investimentoPorcentagem: 100, // Como totalInvestedValue agora é igual ao totalPortfolioValue, a porcentagem é 100%
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCronFetchAndSaveCriptoData() {
    await this.fetchAndSaveCryptocurrencyData()
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    await this.updateVies()
    await this.calculateRentability()
    await this.calculateCurrentAllocation()
  }
}
