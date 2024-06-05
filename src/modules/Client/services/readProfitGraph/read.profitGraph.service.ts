import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'
import { Wallets } from '../../DTO/wallet.dto'

@Injectable()
export class ReadProfitGraph {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getProfitGraphByWallet(wallet: Wallets) {
    try {
      const result = await this.clientReadModel.getProfitGraphByWallet(wallet)

      if (result.length === 0) {
        throw new HttpException(
          'Nenhum dado encontrado.',
          HttpStatus.NO_CONTENT,
        )
      }

      return { statusCode: HttpStatus.OK, result }
    } catch (error) {
      throw new HttpException(
        'Erro ao acessar os dados das criptomoedas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
