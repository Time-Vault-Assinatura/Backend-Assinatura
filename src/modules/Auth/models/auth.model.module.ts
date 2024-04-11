import { Module } from '@nestjs/common'
import { PrismaModule } from '../../../config/prisma/prisma.module'
import { AuthReadModel } from './auth.read'
import { AuthCreateModel } from './auth.create'

@Module({
  imports: [PrismaModule],
  providers: [AuthReadModel, AuthCreateModel],
  exports: [AuthReadModel, AuthCreateModel],
})
export class AuthModelModule {}
