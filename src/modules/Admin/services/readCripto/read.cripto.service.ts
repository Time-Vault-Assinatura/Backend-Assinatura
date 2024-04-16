import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs' // Importação necessária do RxJS
import { AdminReadModel } from '../../models/admin.read'
import { HttpService } from '@nestjs/axios'

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
    const url = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/historical';
    const headers = {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
    };

    try {
      const response = await firstValueFrom(this.httpService.get(url, { headers }));
      const responseData = response.data;

      if (!responseData || !responseData.data || !responseData.data.quotes || responseData.data.quotes.length === 0) {
        throw new HttpException('Invalid response data', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return responseData.data.quotes;
    } catch (error) {
      console.error('Error fetching historical quotes:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to fetch historical quotes', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}