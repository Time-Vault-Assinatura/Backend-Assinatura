import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AdminUpdateModel } from '../../models/admin.update'
import { AdminReadModel } from '../../models/admin.read'

@Injectable()
export class UpdateUpdateService {
  constructor(
    private readonly adminUpdateModel: AdminUpdateModel,
    private readonly adminReadModel: AdminReadModel,
  ) {}

  async updateUpdate(id: number, update?: string, updateDate?: string) {
    const existUpdate = await this.adminReadModel.getUpdateById(id)

    if (!existUpdate) {
      throw new HttpException(
        `A atualização com ${id} não existe.`,
        HttpStatus.NOT_FOUND,
      )
    }

    try {
      const result = await this.adminUpdateModel.updateUpdate(
        id,
        update,
        updateDate,
      )
      return { statusCode: HttpStatus.OK, result }
    } catch (error) {
      console.error('Erro ao atualizar detalhes da atualização:', error)
      throw new HttpException(
        'Falha ao atualizar detalhes da atualização.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
