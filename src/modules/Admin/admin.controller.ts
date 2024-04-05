import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Patch,
  Put,
  Get,
} from '@nestjs/common'
import { ReadCriptoService } from './services/readCripto/read.cripto.service'
import { CreateCriptoService } from './services/createCripto/create.cripto.service'
import { AutomaticCronService } from './services/automaticCron/automaticCron.service'
import { DeleteCriptoService } from './services/deleteCripto/delete.cripto.service'
import { UpdateCriptoService } from './services/updateCripto/update.cripto.service'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly readCriptoService: ReadCriptoService,
    private readonly createCriptoService: CreateCriptoService,
    private readonly automaticCronService: AutomaticCronService,
    private readonly deleteCriptoService: DeleteCriptoService,
    private readonly updateCriptoService: UpdateCriptoService,
  ) {}

  @Get('getAll')
  async getAllCriptoData() {
    return await this.readCriptoService.getAllCriptoData()
  }

  @Post('add-ids')
  async addCriptoDataIds(@Body() body: { idsCMC: number[] }) {
    return await this.createCriptoService.addCriptoDataIds(body.idsCMC)
  }

  @Put('add-infos')
  async fetchAndSaveData() {
    return await this.automaticCronService.fetchAndSaveCryptocurrencyData()
  }

  @Delete('delete/:idCMC')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCriptoData(@Param('idCMC', ParseIntPipe) idCMC: number) {
    await this.deleteCriptoService.deleteCripto(idCMC)
  }

  @Patch('update-details/:idCMC')
  async updateCriptoDetails(
    @Param('idCMC', ParseIntPipe) idCMC: number,
    @Body()
    body: {
      entrada?: string
      alocacao?: string
    },
  ) {
    return await this.updateCriptoService.updateEntryAndAllocation({
      idCMC,
      ...body,
    })
  }
}
