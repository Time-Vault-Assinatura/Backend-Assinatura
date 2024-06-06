// user-data.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class UserDataService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getUserData(email: string) {
    try {
      const userData = await this.clientReadModel.getUserData(email)
      if (!userData) {
        throw new HttpException(
          'Usuário não encontrado.',
          HttpStatus.NO_CONTENT,
        )
      }
      return  userData 
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar dados do usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
