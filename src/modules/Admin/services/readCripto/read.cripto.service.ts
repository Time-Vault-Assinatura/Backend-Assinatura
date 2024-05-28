import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AdminReadModel } from '../../models/admin.read'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class ReadCriptoService {
  constructor(
    private readonly adminReadModel: AdminReadModel,
    private readonly httpService: HttpService,
  ) {}

  async getAllCriptoData() {
    try {
      const allCriptoData = await this.adminReadModel.getAllCriptoData()
      if (allCriptoData.length === 0) {
        throw new HttpException(
          'Nenhum dado de criptomoeda encontrado.',
          HttpStatus.NO_CONTENT,
        )
      }
      return { statusCode: HttpStatus.OK, allCriptoData }
    } catch (error) {
      throw new HttpException(
        'Erro ao acessar os dados das criptomoedas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getAllBuyAndSell() {
    try {
      const allBuyAndSell = await this.adminReadModel.getAllBuyAndSell()
      if (allBuyAndSell.length === 0) {
        throw new HttpException(
          'Nenhuma compra e venda encontrada',
          HttpStatus.NO_CONTENT,
        )
      }
      return allBuyAndSell
    } catch (error) {
      throw new HttpException(
        'Erro ao acessar os dados de compra e venda',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getFiltredBuyAndSell(criptoId: string) {
    try {
      const filtredBuyAndSell =
        await this.adminReadModel.getFiltredBuyAndSell(criptoId)
      if (filtredBuyAndSell.length === 0) {
        throw new HttpException(
          `Nenhuma compra e venda encontrada para a moeda com ID ${criptoId}`,
          HttpStatus.NO_CONTENT,
        )
      }
      return filtredBuyAndSell
    } catch (error) {
      throw new HttpException(
        `Erro ao acessar as transações filtradas para a moeda com ID ${criptoId}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
