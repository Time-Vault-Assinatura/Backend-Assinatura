import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AdminDeleteModel } from '../../models/admin.delete'

@Injectable()
export class DeleteUpdateService {
  constructor(private readonly adminDeleteModel: AdminDeleteModel) {}

  async DeleteUpdate(id: number) {
    try {
      const result = await this.adminDeleteModel.DeleteUpdate(id)
      if (!result) {
        throw new HttpException(
          'Atualização não encontrada.',
          HttpStatus.NOT_FOUND,
        )
      }
      return { statusCode: HttpStatus.OK, result }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'Atualização não encontrada.',
          HttpStatus.NOT_FOUND,
        )
      }
      throw new HttpException(
        'Erro ao deletar a atualização.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
