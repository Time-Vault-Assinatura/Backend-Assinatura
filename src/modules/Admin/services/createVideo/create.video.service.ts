import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
    const existingVideoUrl = await this.adminReadModel.existsVideoUrl()
    if (existingVideoUrl.includes(videoInfo.videoUrl)) {
      throw new HttpException(
        `O url '${videoInfo.videoUrl}' já existe.`,
        HttpStatus.CONFLICT,
      )
    }

    const existingClassNames = await this.adminReadModel.existsClassName()
    if (existingClassNames.includes(videoInfo.className)) {
      throw new HttpException(
        `O nome da classe '${videoInfo.className}' já existe.`,
        HttpStatus.CONFLICT,
      )
    }

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

      return {
        statusCode: HttpStatus.OK,
        message: `O video foi adicionado com sucesso: ${result}`,
      }
    } catch (error) {
      throw new HttpException(
        'Falha ao adicionar uma cripto.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
