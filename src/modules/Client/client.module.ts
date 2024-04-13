import { Module } from '@nestjs/common'
import { ClientServiceModule } from './services/client.service.module'
import { ClientController } from './client.controller'
import { AuthServiceModule } from '../Auth/service/service.auth.module'
import { UserDataService } from './services/getUserData.service.ts/getUserData'

@Module({
  imports: [ClientServiceModule, AuthServiceModule],
  controllers: [ClientController],
})
export class ClientModule {}
