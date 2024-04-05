import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class ClientUpdateModel {
  constructor(private readonly prismaService: PrismaService) {}
}
