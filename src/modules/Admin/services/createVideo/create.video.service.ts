import { Injectable } from '@nestjs/common'
import { AdminCreateModel } from '../../models/admin.create'

@Injectable()
export class CreateVideoService {
  constructor(private readonly adminCreateModel: AdminCreateModel) {}

  async addVideo(videoInfo: {
    module: string
    className: string
    classOrder: number
    classDescription: string
    classTime: string
    videoUrl: string
    bannerUrl?: string
    isVisible?: boolean
  }) {
    // validação se o modulo existe
    // validação se já existe uma aula com esse nome
    // validação se ja existe um video com mesma url
    // validação se o classorder dentro do modulo não é igual a outro existente,EX: não podem ter duas aulas 1

    try {
      const result = await this.adminCreateModel.addVideo(videoInfo)
      return result
    } catch (error) {
      console.error('erro desconhecido:', error)
      throw new Error('um erro desconhecido ocorreu')
    }
  }
}
// vai para main
