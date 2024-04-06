import { Module } from '@nestjs/common'
import { ClientServiceModule } from './services/client.service.module'
import { ClientController } from './client.controller'

@Module({
    imports: [ClientServiceModule],
    controllers: [ClientController],
})
export class ClientModule { }
