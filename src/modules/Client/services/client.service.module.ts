import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ClientModelModule } from '../models/client.model.module'
import { GetAllCriptoService } from './getAllCripto/getAllCripto.service'
import { UserDataService } from './getUserData/getUserData.service'
import { CreateUserService } from './createClientData/create.client.service'
import { ReadVideoService } from './readVideo/read.video.service'
import { UpdateVideoService } from './updateVideo/update.video.service'

@Module({
  imports: [ClientModelModule, HttpModule],
  providers: [
    GetAllCriptoService,
    UserDataService,
    CreateUserService,
    ReadVideoService,
    UpdateVideoService,
  ],
  exports: [
    GetAllCriptoService,
    UserDataService,
    CreateUserService,
    ReadVideoService,
    UpdateVideoService,
  ],
})
export class ClientServiceModule {}
