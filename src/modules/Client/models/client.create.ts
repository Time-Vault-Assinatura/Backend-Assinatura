import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class ClientCreateModel {
  constructor(private readonly prismaService: PrismaService) {}

  async addFeedback(
    userId: string,
    categoria: string,
    assunto: string,
    feedback: string,
    nps: string,
  ) {
    try {
      const result = await this.prismaService.feedbacks.createMany({
        data: [{ user_id: userId, categoria, assunto, feedback, nps }],
      })
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
