import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CriptoDataService } from './CriptoData.service';
import { ModelCreate } from 'src/modelCreate';
import { PrismaService } from 'src/Prisma/prisma.service';
import { CriptoDataController } from './CriptoData.controller';
import { ModelUpdate } from 'src/modelUpdate';
import { ModelDelete } from 'src/modelDelete';
import { ModelGet } from 'src/modelGet';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [HttpModule, ScheduleModule.forRoot()],
    providers: [CriptoDataService, ModelCreate, ModelUpdate, ModelDelete, ModelGet, PrismaService],
    controllers: [CriptoDataController]
})
export class CriptoDataModule { }