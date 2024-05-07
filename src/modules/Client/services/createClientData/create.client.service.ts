import { Injectable } from '@nestjs/common'
import { ClientCreateModel } from '../../models/client.create'

@Injectable()
export class CreateUserService {
  constructor(private readonly clientCreateModel: ClientCreateModel) {}

  async addFeedback(
    userId: string,
    categoria: string,
    assunto: string,
    feedback: string,
    nps: string,
  ) {
    try {
      await this.clientCreateModel.addFeedback(
        userId,
        categoria,
        assunto,
        feedback,
        nps,
      )
      return {
        message: `O feedback do cliente foi adicionado com sucesso, categoria: "${categoria}", assunto: "${assunto}",  feedback: "${feedback}", nps: "${nps}"`,
      }
    } catch (error) {
      throw new Error('erro')
    }
  }
}
