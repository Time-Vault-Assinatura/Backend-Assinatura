import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ClientUpdateModel } from '../../models/client.update'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class UpdateVideoService {
  constructor(
    private readonly clientUpdateModel: ClientUpdateModel,
    private readonly clientReadModel: ClientReadModel,
  ) {}

  async updateVideoView(uuid: string, videoId: string, viewed: boolean) {
    // Validar se o vídeo existe
    const videoExists = await this.clientReadModel.checkVideoExists(videoId)
    if (!videoExists) {
      throw new NotFoundException(`Video with ID ${videoId} not found.`)
    }

    // Validar se o usuário existe
    const userExists = await this.clientReadModel.checkUserExists(uuid)
    if (!userExists) {
      throw new NotFoundException(`User with ID ${uuid} not found.`)
    }

    // Atualizar a visualização do vídeo
    try {
      const result = await this.clientUpdateModel.updateVideoView(
        uuid,
        videoId,
        viewed,
      )
      return  result 
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar status do video',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
