import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { AdminModule } from './modules/Admin/admin.module'
import { ClientModule } from './modules/Client/client.module'
import { AuthModule } from './modules/Auth/auth.module'

@Module({
  imports: [ScheduleModule.forRoot(), AdminModule, ClientModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
