import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { AdminModule } from './modules/Admin/admin.module'
import { ClientModule } from './modules/Client/client.module'

@Module({
  imports: [ScheduleModule.forRoot(), AdminModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
