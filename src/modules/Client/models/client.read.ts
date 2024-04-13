import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class ClientReadModel {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCriptoDataFiltred() {
    try {
      const allCriptoData = await this.prismaService.cripto_data.findMany({
        where: {
          isVisible: true,
        },
      })
      return allCriptoData
    } catch (error) {
      console.error(
        'Erro ao buscar dados de criptomoedas sem campos nulos:',
        error,
      )
      throw error
    }
  }

  async getUserData(email: string) {
    try {
      const userData = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      })
      return userData
    } catch (error) {
      console.log('Error ao buscar dados de usuario:', error)
      throw error
    }
  }
}
