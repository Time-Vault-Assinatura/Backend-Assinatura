import { Injectable } from '@nestjs/common'
import { AdminDeleteModel } from '../../models/admin.delete'
import { Prisma } from '@prisma/client'

@Injectable()
export class DeleteCriptoService {
  constructor(private readonly adminDeleteModel: AdminDeleteModel) {}

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
      return await this.adminDeleteModel.deleteBuyAndSell(id)
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
