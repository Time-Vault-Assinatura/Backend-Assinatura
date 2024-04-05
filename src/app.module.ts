import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './Prisma/prisma.module'
import { CriptoDataModule } from './CriptoData/CriptoData.module'
import { CriptoDataController } from './CriptoData/CriptoData.controller'
import { CriptoDataService } from './CriptoData/CriptoData.service'
import { TeamEditCriptoDataModule } from './TeamEditCriptoData/TeamEditCriptoData.module'

@Module({
  imports: [
    PrismaModule,
    CriptoDataModule,
    TeamEditCriptoDataModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
