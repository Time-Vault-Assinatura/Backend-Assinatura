import { Injectable } from '@nestjs/common'
import { AdminUpdateModel } from '../../models/admin.update'
import { AdminReadModel } from '../../models/admin.read'

@Injectable()
export class UpdateVideoService {
  constructor(
    private readonly adminUpdateModel: AdminUpdateModel,
    private readonly adminReadModel: AdminReadModel,
  ) {}

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

    const validClassOrder = await this.adminReadModel.getClassOrderByModule(
      videoInfo.module,
      videoInfo.classOrder,
    )

    try {
      if (validClassOrder.length !== 0) {
        await this.adminUpdateModel.updateIncreaseClassOrder(
          videoInfo.module,
          videoInfo.classOrder,
        )
      }
      const result = await this.adminUpdateModel.updateVideo(videoInfo)

      return result
    } catch (error) {
      console.error('erro desconhecido:', error)
      throw new Error('um erro desconhecido ocorreu')
    }
  }
}

// vai para main
