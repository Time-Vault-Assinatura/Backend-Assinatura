import { Module } from '@nestjs/common'
import { ClientServiceModule } from './services/admin.service.module'
import { ClientController } from './client.controller'

@Module({
  imports: [ClientServiceModule],
  controllers: [ClientController],
})
export class ClientModule {}
