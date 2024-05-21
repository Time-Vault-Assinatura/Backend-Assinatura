import { Injectable, NotFoundException } from '@nestjs/common'
import { ClientUpdateModel } from '../../models/client.update'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class UpdateVideoService {
  constructor(
    private readonly clientUpdateModel: ClientUpdateModel,
    private readonly clientReadModel: ClientReadModel,
  ) {}

  async updateVideoView(userId: string, videoId: string, viewed: boolean) {
    // Validar se o vídeo existe
    const videoExists = await this.clientReadModel.checkVideoExists(videoId)
    if (!videoExists) {
      throw new NotFoundException(`Video with ID ${videoId} not found.`)
    }

    // Validar se o usuário existe
    const userExists = await this.clientReadModel.checkUserExists(userId)
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found.`)
    }

    // Atualizar a visualização do vídeo
    try {
      await this.clientUpdateModel.updateVideoView(userId, videoId, viewed)
    } catch (error) {
      console.error('Error updating video view status:', error)
      throw new Error('Failed to update video view status.')
    }
  }
}
