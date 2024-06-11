import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class ReadVideoService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getAllVideos() {
    const allVideos = await this.clientReadModel.getAllVideos()

    if (allVideos.length === 0) {
      throw new HttpException('Nenhum video encontrado.', HttpStatus.NO_CONTENT)
    }

    return  allVideos 
  }

  async getVideosView() {
    const allVideosView = await this.clientReadModel.getVideosView()

    if (allVideosView.length === 0) {
      throw new HttpException(
        'nenhuma visualização foi encontrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    return  allVideosView 
  }
}
