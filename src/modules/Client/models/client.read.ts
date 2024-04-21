import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { Wallets } from '@prisma/client'

@Injectable()
export class ClientReadModel {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCriptoDataFiltred(wallet: Wallets) {
    try {
      const allCriptoData = await this.prismaService.cripto_data.findMany({
        where: {
          isVisible: true,
          wallet,
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

  async getAllCriptoData() {
    try {
      const allCriptoData = await this.prismaService.cripto_data.findMany()
      return allCriptoData
    } catch (error) {
      console.error('Erro ao buscar todos os dados de criptomoedas:', error)
      throw error
    }
  }
}
