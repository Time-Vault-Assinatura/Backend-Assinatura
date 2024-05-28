import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'
import { Wallets } from 'src/modules/Admin/DTO/wallet.dto'
import { firstValueFrom } from 'rxjs'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class GetAllCriptoService {
  constructor(
    private readonly clientReadModel: ClientReadModel,
    private readonly httpService: HttpService,
  ) {}

  async getAllVisibleCriptoData(wallet: Wallets) {
    try {
      const allCriptoDataFiltred =
        await this.clientReadModel.getAllCriptoDataFiltred(wallet)

      if (allCriptoDataFiltred.length === 0) {
        throw new HttpException(
          'Nenhum dado de criptomoeda encontrado sem campos nulos.',
          HttpStatus.NO_CONTENT,
        )
      }

      return { statusCode: HttpStatus.OK, allCriptoDataFiltred }
    } catch (error) {
      throw new HttpException(
        `Erro ao acessar os dados da carteira: ${wallet}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  public async calculateWalletRentability(wallet: Wallets) {
    try {
      const criptoDatas =
        await this.clientReadModel.getAllCriptoDataFiltred(wallet)
      const totalInvested = criptoDatas.reduce(
        (acc, cripto) => acc + parseFloat(cripto.valorInvestido),
        0,
      )
      const rendimento = ((totalInvested - 2000) / 2000) * 100

      return {
        totalInvested,
        rendimento,
      }
    } catch (error) {
      throw new HttpException(
        `Erro ao calcular o retorno da carteira: ${wallet}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async fetchHistoricalQuotes() {
    const baseUrl =
      'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/historical'
    const apiKey = process.env.CMC_API_KEY
    const options = {
      headers: { 'X-CMC_PRO_API_KEY': apiKey },
    }
    try {
      const response = await firstValueFrom(
        this.httpService.get(baseUrl, options),
      )
      const data = response.data.data.quotes // Ajuste para acessar os dados corretamente
      const historicalData = data.map((quote) => ({
        timestamp: quote.timestamp,
        totalMarketCap: quote.quote.USD.total_market_cap,
        totalVolume24h: quote.quote.USD.total_volume_24h,
        btcDominance: quote.btc_dominance,
      }))

      console.log(historicalData) // Ajuste para visualizar os dados no console, se necessário

      return historicalData
    } catch (error) {
      throw new HttpException(
        `Error fetching cryptocurrency data:${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
