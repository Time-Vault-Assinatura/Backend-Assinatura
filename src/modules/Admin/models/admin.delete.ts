import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class AdminDeleteModel {
  constructor(private prismaService: PrismaService) {}

  async deleteCripto(id: string) {
    try {
      return await this.prismaService.cripto_data.delete({
        where: { id },
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
      if (error.code === 'P2025') {
        throw new Error('Registro não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o registro.')
    }
  }

  async deleteVideo(id: string) {
    try {
      return await this.prismaService.videos.delete({
        where: { id },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Video não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o video.')
    }
  }

  async DeleteUpdate(id: number) {
    try {
      return await this.prismaService.update.delete({
        where: { id },
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new Error('Video não encontrado.')
      }
      throw new Error('Erro do Prisma ao deletar o video.')
    }
  }
}
