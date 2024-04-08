import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../config/prisma/prisma.service'

@Injectable()
export class WebhookCreateModel {
  constructor(private prismaService: PrismaService) {}

  async userCreate(
    firstName: string,
    lastName: string,
    email: string,
    status: string,
  ) {
    await this.prismaService.user.upsert({
      where: { email },
      create: {
        name: `${firstName} ${lastName}`,
        email,
        isValid: status === 'active',
      },
      update: {
        name: `${firstName} ${lastName}`,
        isValid: status === 'active',
      },
    })
  }
}
