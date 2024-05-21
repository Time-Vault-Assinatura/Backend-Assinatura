import { Injectable } from '@nestjs/common'
import { AdminUpdateModel } from '../../models/admin.update'

@Injectable()
export class UpdateVideoService {
  constructor(private readonly adminUpdateModel: AdminUpdateModel) {}

  async updateVideo(videoInfo: {
    id: string
    module?: string
    className?: string
    classOrder?: number
    classDescription?: string
    classTime?: string
    videoUrl?: string
    bannerUrl?: string
    isVisible?: boolean
  }) {
    // validação se já existe uma aula com esse nome
    // validação se ja existe um video com mesma url
    // validação se o classorder dentro do modulo não é igual a outro existente,EX: não podem ter duas aulas 1
    try {
      const result = await this.adminUpdateModel.updateVideo(videoInfo)
      return result
    } catch (error) {
      console.error('erro desconhecido:', error)
      throw new Error('um erro desconhecido ocorreu')
    }
  }
}
