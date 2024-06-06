import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class GetGlobalMarketInfosService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getAllGlobalMarketInfos() {
    try {
      const result = await this.clientReadModel.getAllGlobalMarketInfo()

      if (result.length === 0) {
        throw new HttpException(
          'Nenhum dado de criptomoeda encontrado sem campos nulos.',
          HttpStatus.NO_CONTENT,
        )
      }

      return  result 
    } catch (error) {
      throw new HttpException(
        `Erro ao buscar dados globais do mercado`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
