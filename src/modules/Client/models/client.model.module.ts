import { Module } from '@nestjs/common'
import { PrismaModule } from '../../../config/prisma/prisma.module'
import { ClientReadModel } from './client.read'
import { ClientCreateModel } from './client.create'
import { ClientUpdateModel } from './client.update'
import { ClientDeleteModel } from './client.delete'

@Module({
  imports: [PrismaModule],
  providers: [
    ClientReadModel,
    ClientCreateModel,
    ClientUpdateModel,
    ClientDeleteModel,
    PrismaModule,
  ],
  exports: [
    ClientReadModel,
    ClientCreateModel,
    ClientUpdateModel,
    ClientDeleteModel,
    PrismaModule,
  ],
})
export class ClientModelModule {}
