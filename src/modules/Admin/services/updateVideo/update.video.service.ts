import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
      if (validClassOrder.length !== 0) {
        await this.adminUpdateModel.updateIncreaseClassOrder(
          videoInfo.module,
          videoInfo.classOrder,
        )
      }
      const result = await this.adminUpdateModel.updateVideo(videoInfo)

      return {
        statusCode: HttpStatus.OK,
        result,
      }
    } catch (error) {
      throw new HttpException(
        'Falha ao atualizar dados do video.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
