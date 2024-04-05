import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta PrismaService para que possa ser usado em outros módulos
})
export class PrismaModule {}
