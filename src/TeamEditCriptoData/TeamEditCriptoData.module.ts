import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ModelCreate } from 'src/modelCreate'
import { PrismaService } from 'src/Prisma/prisma.service'
import { ModelUpdate } from 'src/modelUpdate'
import { ModelDelete } from 'src/modelDelete'
import { ModelGet } from 'src/modelGet'
import { TeamEditCriptoDataService } from './TeamEditCriptoData.service'
import { TeamEditCriptoDataController } from './TeamEditCriptoData.controller'
import { CriptoDataService } from 'src/CriptoData/CriptoData.service'

@Module({
  imports: [HttpModule],
  providers: [
    TeamEditCriptoDataService,
    ModelCreate,
    ModelUpdate,
    ModelDelete,
    ModelGet,
    PrismaService,
    CriptoDataService,
  ],
  controllers: [TeamEditCriptoDataController],
})
export class TeamEditCriptoDataModule {}
