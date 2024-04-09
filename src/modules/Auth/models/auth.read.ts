import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class AuthReadModel {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      })

      return user
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      throw error
    }
  }
}
