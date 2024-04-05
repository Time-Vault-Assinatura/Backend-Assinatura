import { Module } from '@nestjs/common'
import { PrismaModule } from '../../../config/prisma/prisma.module'
import { AdminReadModel } from './admin.read'
import { AdminCreateModel } from './admin.create'
import { AdminUpdateModel } from './admin.update'
import { AdminDeleteModel } from './admin.delete'

@Module({
  imports: [PrismaModule],
  providers: [
    AdminReadModel,
    AdminCreateModel,
    AdminUpdateModel,
    AdminDeleteModel,
  ],
  exports: [
    AdminReadModel,
    AdminCreateModel,
    AdminUpdateModel,
    AdminDeleteModel,
  ],
})
export class AdminModelModule {}
