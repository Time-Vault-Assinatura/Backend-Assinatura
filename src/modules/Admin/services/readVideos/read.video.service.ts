import { Injectable } from '@nestjs/common'
import { AdminReadModel } from '../../models/admin.read'

@Injectable()
export class ReadVideoService {
  constructor(private readonly adminReadModel: AdminReadModel) {}

  async getAllVideos() {
    const allVideos = await this.adminReadModel.getAllVideos()

    if (allVideos.length === 0) {
      return 'nenhum video encontrado'
    }

    return allVideos
  }
}
