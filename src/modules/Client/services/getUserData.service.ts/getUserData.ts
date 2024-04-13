// user-data.service.ts
import { Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class UserDataService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getUserData(email: string) {
    try {
      const userData = await this.clientReadModel.getUserData(email)
      if (!userData) {
        return { message: 'Usuário não encontrado.' }
      }
      return userData
    } catch (error) {
      console.log('Erro ao buscar dados do usuário:', error)
      throw new Error('Falha ao buscar dados do usuário')
    }
  }
}
