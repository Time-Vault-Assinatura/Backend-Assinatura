import { Injectable } from '@nestjs/common'
import { AdminCreateModel } from '../../models/admin.create'
import { AdminReadModel } from '../../models/admin.read'
import { AdminUpdateModel } from '../../models/admin.update'

@Injectable()
export class CreateVideoService {
  constructor(
    private readonly adminCreateModel: AdminCreateModel,
    private readonly adminReadModel: AdminReadModel,
    private readonly adminUpdateModel: AdminUpdateModel,
  ) {}

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
    const validClassOrder = await this.adminReadModel.getClassOrderByModule(
      videoInfo.module,
      videoInfo.classOrder,
    )

    try {
      const result = await this.adminCreateModel.addVideo(videoInfo)

      if (validClassOrder.length !== 0) {
        await this.adminUpdateModel.updateIncreaseClassOrder(
          videoInfo.module,
          videoInfo.classOrder,
        )
      }

      return result
    } catch (error) {
      console.error('erro desconhecido:', error)
      throw new Error('um erro desconhecido ocorreu')
    }
  }
}
// vai para main
