import { Module } from '@nestjs/common'
import { AdminServiceModule } from './services/admin.service.module'
import { AdminController } from './admin.controller'
import { AuthServiceModule } from '../Auth/service/service.auth.module'

@Module({
  imports: [AdminServiceModule, AuthServiceModule],
  controllers: [AdminController],
})
export class AdminModule {}
