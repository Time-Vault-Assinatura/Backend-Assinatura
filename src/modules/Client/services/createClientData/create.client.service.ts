import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ClientCreateModel } from '../../models/client.create'

@Injectable()
export class CreateUserService {
  constructor(private readonly clientCreateModel: ClientCreateModel) {}

  async addFeedback(
    uuid: string,
    categoria: string,
    assunto: string,
    feedback: string,
    nps: string,
  ) {
    try {
      await this.clientCreateModel.addFeedback(
        uuid,
        categoria,
        assunto,
        feedback,
        nps,
      )
      return {
        statusCode: HttpStatus.OK,
        message: `O feedback do cliente foi adicionado com sucesso, categoria: "${categoria}", assunto: "${assunto}",  feedback: "${feedback}", nps: "${nps}"`,
      }
    } catch (error) {
      throw new HttpException(
        'Falha ao enviar feedback.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
