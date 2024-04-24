import { Injectable } from '@nestjs/common'
import { ClientCreateModel } from '../../models/client.create'

@Injectable()
export class CreateUserService {
  constructor(private readonly clientCreateModel: ClientCreateModel) {}

  async addFeedback(userId: string, feedback: string) {
    try {
      await this.clientCreateModel.addFeedback(userId, feedback)
      return {
        message: `O feedback do cliente foi adicionado com sucesso, feedback: "${feedback}"`,
      }
    } catch (error) {
      throw new Error('erro')
    }
  }
}
