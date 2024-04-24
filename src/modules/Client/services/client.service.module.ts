import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ClientModelModule } from '../models/client.model.module'
import { GetAllCriptoService } from './getAllCripto/getAllCripto.service'
import { UserDataService } from './getUserData/getUserData.service'
import { CreateUserService } from './createClientData/create.client.service'

@Module({
  imports: [ClientModelModule, HttpModule],
  providers: [GetAllCriptoService, UserDataService, CreateUserService],
  exports: [GetAllCriptoService, UserDataService, CreateUserService],
})
export class ClientServiceModule {}
