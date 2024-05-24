import { Injectable } from '@nestjs/common'
import { AdminDeleteModel } from '../../models/admin.delete'

@Injectable()
export class DeleteVideoService {
  constructor(private readonly adminDeleteModel: AdminDeleteModel) {}

  async deleteVideo(id: string) {
    try {
      const result = await this.adminDeleteModel.deleteVideo(id)
      return result
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Registro não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o registro.')
    }
  }
}
