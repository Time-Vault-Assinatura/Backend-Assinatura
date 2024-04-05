import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class ClientCreateModel {
  constructor(private readonly prismaService: PrismaService) {}
}
