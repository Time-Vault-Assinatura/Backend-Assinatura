import { Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class ReadVideoService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getAllVideos() {
    const allVideos = await this.clientReadModel.getAllVideos()

    if (allVideos.length === 0) {
      return 'nenhum video encontrado'
    }

    return allVideos
  }
}
