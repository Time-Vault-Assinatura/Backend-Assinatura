import { Module } from '@nestjs/common'
import { AdminModelModule } from '../models/admin.model.module'
import { CreateCriptoService } from './createCripto/create.cripto.service'
import { UpdateCriptoService } from './updateCripto/update.cripto.service'
import { DeleteCriptoService } from './deleteCripto/delete.cripto.service'
import { ReadCriptoService } from './readCripto/read.cripto.service'
import { AutomaticCronService } from './automaticCron/automaticCron.service'
import { HttpModule } from '@nestjs/axios'
import { ReadUserService } from './readUser/read.user.service'

@Module({
  imports: [AdminModelModule, HttpModule],
  providers: [
    CreateCriptoService,
    UpdateCriptoService,
    DeleteCriptoService,
    ReadCriptoService,
    ReadUserService,
    AutomaticCronService,
  ],
  exports: [
    CreateCriptoService,
    UpdateCriptoService,
    DeleteCriptoService,
    ReadCriptoService,
    ReadUserService,
    AutomaticCronService,
  ],
})
export class AdminServiceModule {}
