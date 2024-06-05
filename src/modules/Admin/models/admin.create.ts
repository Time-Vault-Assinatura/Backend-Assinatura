import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { Wallets } from '../DTO/wallet.dto'

@Injectable()
export class AdminCreateModel {
  constructor(private readonly prismaService: PrismaService) {}

  async addCriptoDataIds(idsCMC: number[]) {
    try {
      const dataToInsert = idsCMC.map((idCMC) => ({
        idCMC,
      }))

      const result = await this.prismaService.cripto_data.createMany({
        data: dataToInsert,
        skipDuplicates: true,
      })

      return { count: result.count }
    } catch (error) {
      console.error('Erro ao adicionar idsCMC:', error)
      throw error
    }
  }

  async addBuyAndSell(criptoId: string, qnt: number) {
    try {
      const result = await this.prismaService.historic_buy_sell.createMany({
        data: [{ criptoId, qnt }],
      })
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async addVideo(videoInfo: {
    module: string
    className: string
    classOrder: number
    classDescription: string
    classTime: string
    videoUrl: string
    bannerUrl?: string
    isVisible?: boolean
  }) {
    try {
      const {
        module,
        className,
        classOrder,
        classDescription,
        classTime,
        videoUrl,
        bannerUrl,
        isVisible,
      } = videoInfo
      const result = await this.prismaService.videos.create({
        data: {
          module,
          className,
          classOrder,
          classDescription,
          classTime,
          videoUrl,
          bannerUrl,
          isVisible,
        },
      })
      return result
    } catch (error) {
      console.error('Error adding video class:', error)
    }
  }

  async addUpdate(update: string, updateDate: string) {
    try {
      const result = await this.prismaService.update.create({
        data: {
          update,
          updateDate,
        },
      })
      return result
    } catch (error) {
      console.error('Error adding update:', error)
    }
  }

  async addProfitAndDateInGraph(profit: string, wallet: Wallets) {
    const today = new Date().toISOString().slice(0, 10) // Formato AAAA-MM-DD

    try {
      await this.prismaService.profit_graph.create({
        data: {
          profit,
          date: today,
          wallet,
        },
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
