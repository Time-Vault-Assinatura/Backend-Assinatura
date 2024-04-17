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
    const url =
      'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/historical';
    const headers = {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
    };
  
    try {
      const response = await axios.get(url, { headers });
  
      if (response.data && response.data.data && response.data.data[0]) {
        const latestData = response.data.data[0];
        const { total_market_cap, total_volume_24h, btc_dominance } = latestData;
  
        return {
          totalMarketCap: total_market_cap,
          totalVolume24h: total_volume_24h,
          btcDominance: btc_dominance
        };
      } else {
        console.error('Resposta inválida da API:', response.data);
        throw new Error('Resposta inválida da API');
      }
    } catch (error) {
      console.error('Erro ao buscar cotações históricas:', error);
      throw new Error('Falha ao buscar cotações históricas');
    }
  }
}
