import { Module } from '@nestjs/common'
import { PrismaModule } from '../../../config/prisma/prisma.module'
import { AuthReadModel } from './auth.read'

@Module({
  imports: [PrismaModule],
  providers: [AuthReadModel],
  exports: [AuthReadModel],
})
export class AuthModelModule {}
