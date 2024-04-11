import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class AuthCreateModel {
  constructor(private readonly prismaService: PrismaService) {}

  async createPassword(email: string, password: string, isFirstAcess: boolean) {
    try {
      return await this.prismaService.user.update({
        where: { email },
        data: {
          password,
          isFirstAcess,
        },
      })
    } catch (error) {
      console.error('Erro ao criar senha:', error)
      throw error
    }
  }
}
