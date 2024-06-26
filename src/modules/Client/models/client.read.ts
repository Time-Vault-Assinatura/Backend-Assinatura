import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { Wallets } from 'src/modules/Admin/DTO/wallet.dto'

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

  async getAllVideos() {
    try {
      const result = await this.prismaService.videos.findMany({
        where: {
          isVisible: true,
        },
      })
      return result
    } catch (error) {
      console.error('Erro ao buscar videos', error)
      throw error
    }
  }

  async checkVideoExists(videoId: string): Promise<boolean> {
    const video = await this.prismaService.videos.findUnique({
      where: {
        id: videoId,
      },
    })
    return Boolean(video)
  }

  async checkUserExists(userId: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    })
    return Boolean(user)
  }

  async getVideosView() {
    try {
      const result = await this.prismaService.videoView.findMany()
      return result
    } catch (error) {
      console.log('erro ao buscar visualizações de videos', error)
      throw error
    }
  }

  async getUpdate() {
    try {
      const result = await this.prismaService.update.findMany()
      return result
    } catch (error) {
      console.log('erro ao buscar atualizações', error)
      throw error
    }
  }

  async getProfitGraphByWallet(wallet: Wallets) {
    try {
      const result = await this.prismaService.profit_graph.findMany({
        where: {
          wallet,
        },
      })
      return result
    } catch (error) {
      console.log(
        `Erro ao buscar os dados para o grafico filtrado pela carteira ${wallet}`,
        error,
      )
      throw error
    }
  }

  async getAllGlobalMarketInfo() {
    try {
      const result = await this.prismaService.global_market_infos.findMany()
      return result
    } catch (error) {
      console.log(`erro ao buscar os dados do mercado global.`, error)
      throw error
    }
  }
}
