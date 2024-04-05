// CriptoData.service.ts
import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '@nestjs/axios'
import { PrismaService } from 'src/Prisma/prisma.service'
import { ModelCreate } from 'src/modelCreate'
import { firstValueFrom } from 'rxjs'
import { ModelUpdate } from 'src/modelUpdate'
import { ModelGet } from 'src/modelGet'

@Injectable()
export class CriptoDataService {
  constructor(
    private httpService: HttpService,
    private prismaService: PrismaService,
    private modelCreate: ModelCreate,
    private modelUpdate: ModelUpdate,
    private modelGet: ModelGet,
  ) {}

  async fetchAndSaveCryptocurrencyData() {
    const criptoDatas = await this.prismaService.criptoData.findMany({
      select: { idCMC: true },
    })
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
              marketCap: coinData.quote[convert].market_cap,
              volume24h: coinData.quote[convert].volume_24h,
              percentChange24h: coinData.quote[convert].percent_change_24h,
            }
          } else {
            return null
          }
        })
        .filter((v) => v !== null)

      for (const value of values) {
        await this.modelUpdate.UpdateCriptoData(value)
      }
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error)
    }
  }

  async getCriptoData(idCMC: number) {
    if (!Number.isInteger(idCMC) || idCMC <= 0) {
      throw new Error(
        'O ID fornecido é inválido. Deve ser um número inteiro positivo.',
      )
    }

    const criptoData = await this.modelGet.getCriptoData(idCMC)
    if (!criptoData) {
      throw new Error(`Nenhum dado encontrado para o ID ${idCMC}.`)
    }

    return criptoData
  }

  // Método para buscar todos os dados de criptomoedas
  async getAllCriptoData() {
    const allCriptoData = await this.modelGet.getAllCriptoData()

    if (allCriptoData.length === 0) {
      throw new Error('Nenhum dado de criptomoeda encontrado.')
    }

    return allCriptoData
  }

  async getAllNonNullCriptoData() {
    const allCriptoDataFiltred = await this.modelGet.getAllCriptoDataFiltred()

    if (allCriptoDataFiltred.length === 0) {
      throw new Error('Nenhum dado de criptomoeda encontrado sem campos nulos.')
    }

    return allCriptoDataFiltred
  }

  async calculateCurrentAllocation() {
    // Removeremos a linha que define totalPortfolioValue como 10000
    let totalInvestedValue = 0 // Total investido na carteira

    const criptoDatas = await this.prismaService.criptoData.findMany({
      where: {
        precoAtual: { not: null },
        quantidade: { not: null },
      },
    })

    // Primeira passagem para calcular o total investido
    for (const cripto of criptoDatas) {
      const precoAtual = parseFloat(cripto.precoAtual)
      const quantidade = parseFloat(cripto.quantidade)

      const valorInvestido = quantidade * precoAtual
      totalInvestedValue += valorInvestido

      // Atualiza o valorInvestido para cada cripto
      await this.prismaService.criptoData.update({
        where: { id: cripto.id },
        data: { valorInvestido: String(valorInvestido) },
      })
    }

    // totalInvestedValue agora representa o valor total da carteira
    const totalPortfolioValue = totalInvestedValue

    // Segunda passagem para calcular e atualizar a alocação atual
    for (const cripto of criptoDatas) {
      const valorInvestido = parseFloat(cripto.valorInvestido)
      const alocacaoAtual = (valorInvestido / totalPortfolioValue) * 100 // Porcentagem do total da carteira

      await this.prismaService.criptoData.update({
        where: { id: cripto.id },
        data: { alocacaoAtual: String(alocacaoAtual) },
      })
    }

    return {
      totalPortfolioValue,
      totalInvestedValue: totalPortfolioValue, // totalInvestedValue é agora igual ao totalPortfolioValue
      investimentoPorcentagem: 100, // Como totalInvestedValue agora é igual ao totalPortfolioValue, a porcentagem é 100%
    }
  }

  async calculateRentability() {
    const criptoDatas = await this.prismaService.criptoData.findMany({
      where: {
        precoAtual: { not: null },
        entrada: { not: null },
      },
    })

    for (const cripto of criptoDatas) {
      const precoAtual = parseFloat(cripto.precoAtual)
      const entrada = parseFloat(cripto.entrada)

      // Calcula a rentabilidade
      const rentabilidade = ((precoAtual - entrada) / entrada) * 100

      // Atualiza a rentabilidade no banco de dados
      await this.prismaService.criptoData.update({
        where: { id: cripto.id },
        data: { rentabilidade: String(rentabilidade) },
      })
    }

    return { message: 'Rentabilidade calculada e atualizada com sucesso.' }
  }

  async updateVies() {
    const criptoDatas = await this.prismaService.criptoData.findMany({
      where: {
        alocacao: { not: null },
        alocacaoAtual: { not: null },
      },
    })

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

      // Atualiza o viés no banco de dados
      await this.prismaService.criptoData.update({
        where: { id: cripto.id },
        data: { vies },
      })
    }

    return { message: 'Viés atualizado com sucesso.' }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    await this.fetchAndSaveCryptocurrencyData()
    await this.updateVies()
    await this.calculateRentability()
    await this.calculateCurrentAllocation()
  }
}
