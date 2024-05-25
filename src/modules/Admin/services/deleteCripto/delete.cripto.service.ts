import { Injectable } from '@nestjs/common'
import { AdminDeleteModel } from '../../models/admin.delete'
import { AdminUpdateModel } from '../../models/admin.update'

@Injectable()
export class DeleteCriptoService {
  constructor(
    private readonly adminDeleteModel: AdminDeleteModel,
    private readonly adminUpdateModel: AdminUpdateModel,
  ) {}

  async deleteCripto(id: string) {
    try {
      return await this.adminDeleteModel.deleteCripto(id)
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Registro não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o registro.')
    }
  }

  async deleteBuyAndSell(id: string) {
    try {
      await this.adminDeleteModel.deleteBuyAndSell(id)
      await this.adminUpdateModel.updateCriptoQuantity()
      return {
        message: `A criptomoeda com id = ${id} , foi deletada com sucesso!`,
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Registro não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o registro.')
    }
  }
}
// vai para main