import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class GetUpdateService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getUpdate() {
    try {
      const result = await this.clientReadModel.getUpdate()

      if (result.length === 0) {
        throw new HttpException(
          'Nenhuma atualização encontrada.',
          HttpStatus.NO_CONTENT,
        )
      }
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar atualizações.',
        HttpStatus.NO_CONTENT,
      )
    }
  }
}
