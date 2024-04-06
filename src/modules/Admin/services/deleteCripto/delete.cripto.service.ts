import { Injectable } from '@nestjs/common'
import { AdminDeleteModel } from '../../models/admin.delete'
import { AdminUpdateModel } from '../../models/admin.update'
import { Prisma } from '@prisma/client'

@Injectable()
export class DeleteCriptoService {
  constructor(
    private readonly adminDeleteModel: AdminDeleteModel,
    private readonly adminUpdateModel: AdminUpdateModel,
  ) {}

  async deleteCripto(idCMC: number) {
    try {
      return await this.adminDeleteModel.deleteCripto(idCMC)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Registro não encontrado.')
        }
        throw new Error('Erro do Prisma ao deletar o registro.')
      } else {
        throw new Error('Erro desconhecido ao deletar o registro.')
      }
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Registro não encontrado.')
        }
        throw new Error('Erro do Prisma ao deletar o registro.')
      } else {
        throw new Error('Erro desconhecido ao deletar o registro.')
      }
    }
  }
}
