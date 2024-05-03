import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class ClientCreateModel {
  constructor(private readonly prismaService: PrismaService) {}

  async addFeedback(userId: string, feedback: string) {
    try {
      const result = await this.prismaService.feedbacks.createMany({
        data: [{ user_id: userId, feedback }],
      })
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
