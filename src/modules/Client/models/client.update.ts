import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class ClientUpdateModel {
  constructor(private readonly prismaService: PrismaService) {}

  async updateVideoView(userId: string, videoId: string, viewed: boolean) {
    try {
      await this.prismaService.videoView.upsert({
        where: {
          videoId_userId: {
            videoId,
            userId,
          },
        },
        update: {
          viewed,
        },
        create: {
          videoId,
          userId,
          viewed,
        },
      })
    } catch (error) {
      console.log('erro ao atualizar se video já foi visto', error)
      throw error
    }
  }
}
