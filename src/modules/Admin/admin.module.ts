import { Module } from '@nestjs/common'
import { AdminServiceModule } from './services/admin.service.module'
import { AdminController } from './admin.controller'

@Module({
  imports: [AdminServiceModule],
  controllers: [AdminController],
})
export class AdminModule {}
