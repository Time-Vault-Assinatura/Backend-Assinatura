import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs' // Importação necessária do RxJS
import { AdminReadModel } from '../../models/admin.read'
import { HttpService } from '@nestjs/axios'
import axios from 'axios';

@Injectable()
export class ReadCriptoService {
  constructor(
    private readonly adminReadModel: AdminReadModel,
    private readonly httpService: HttpService,
  ) {}

  async getAllCriptoData() {
    const allCriptoData = await this.adminReadModel.getAllCriptoData()

    if (allCriptoData.length === 0) {
      return 'Nenhum dado de criptomoeda encontrado.'
    }

    return allCriptoData
  }

  async getAllBuyAndSell() {
    const allBuyAndSell = await this.adminReadModel.getAllBuyAndSell()

    if (allBuyAndSell.length === 0) {
      return 'Nenhuma compra e venda encontrada'
    }
    return allBuyAndSell
  }

  async getFiltredBuyAndSell(criptoId: string) {
    const filtredBuyAndSell =
      await this.adminReadModel.getFiltredBuyAndSell(criptoId)

    if (filtredBuyAndSell.length === 0) {
      return 'Nenhuma compra e venda encontrada para essa moeda'
    }
    return filtredBuyAndSell
  }

  async fetchHistoricalQuotes() {
    const baseUrl =
    'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/historical'
    const apiKey = process.env.CMC_API_KEY
    const options = {
      headers: { 'X-CMC_PRO_API_KEY': apiKey },

    }
      try {
        const response = await firstValueFrom(this.httpService.get(baseUrl, options));
        const data = response.data.data.quotes; // Ajuste para acessar os dados corretamente
        const historicalData = data.map(quote => ({
          timestamp: quote.timestamp,
          totalMarketCap: quote.quote.USD.total_market_cap,
          totalVolume24h: quote.quote.USD.total_volume_24h,
          btcDominance: quote.btc_dominance,
        }));
    
        console.log(historicalData); // Ajuste para visualizar os dados no console, se necessário
    
        return historicalData
      }catch (error) {
        console.error('Error fetching cryptocurrency data:', error)
    }    
  }
}
