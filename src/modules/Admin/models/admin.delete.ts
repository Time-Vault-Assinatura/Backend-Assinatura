import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class AdminDeleteModel {
  constructor(private prismaService: PrismaService) {}

  async deleteCripto(idCMC: number) {
    try {
      return await this.prismaService.cripto_data.delete({
        where: { idCMC },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Registro não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o registro.')
    }
  }

  async deleteBuyAndSell(id: string) {
    try {
      return await this.prismaService.historic_buy_sell.delete({
        where: { id },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
