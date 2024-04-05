import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ClientModelModule } from '../models/client.model.module'
import { GetAllCriptoService } from './getAllCripto/getAllCripto.service'

@Module({
  imports: [ClientModelModule, HttpModule],
  providers: [GetAllCriptoService],
  exports: [GetAllCriptoService],
})
export class ClientServiceModule {}
