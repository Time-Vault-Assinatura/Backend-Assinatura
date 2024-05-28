import { Injectable } from '@nestjs/common'
import { AdminDeleteModel } from '../../models/admin.delete'
import { AdminReadModel } from '../../models/admin.read'
import { AdminUpdateModel } from '../../models/admin.update'

@Injectable()
export class DeleteVideoService {
  constructor(
    private readonly adminDeleteModel: AdminDeleteModel,
    private readonly adminReadModel: AdminReadModel,
    private readonly adminUpdateModel: AdminUpdateModel,
  ) {}

  async deleteVideo(id: string) {
    const getVideoInformation = await this.adminReadModel.getVideoById(id)

    const validClassOrder = await this.adminReadModel.getClassOrderByModule(
      getVideoInformation.module,
      getVideoInformation.classOrder,
    )

    try {
      const result = await this.adminDeleteModel.deleteVideo(id)

      if (validClassOrder.length !== 0) {
        await this.adminUpdateModel.updatedecreaseClassOrder(
          getVideoInformation.module,
          getVideoInformation.classOrder,
        )
      }

      return result
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Registro não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o registro.')
    }
  }
}
