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
  UseGuards,
} from '@nestjs/common'
import { ReadCriptoService } from './services/readCripto/read.cripto.service'
import { CreateCriptoService } from './services/createCripto/create.cripto.service'
import { AutomaticCronService } from './services/automaticCron/automaticCron.service'
import { DeleteCriptoService } from './services/deleteCripto/delete.cripto.service'
import { UpdateCriptoService } from './services/updateCripto/update.cripto.service'
import { AuthGuardAdmin } from 'src/guards/auth-admin.guard'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly readCriptoService: ReadCriptoService,
    private readonly createCriptoService: CreateCriptoService,
    private readonly automaticCronService: AutomaticCronService,
    private readonly deleteCriptoService: DeleteCriptoService,
    private readonly updateCriptoService: UpdateCriptoService,
  ) {}

  @UseGuards(AuthGuardAdmin)
  @Get('getAll')
  async getAllCriptoData() {
    return await this.readCriptoService.getAllCriptoData()
  }

  @UseGuards(AuthGuardAdmin)
  @Post('add-ids')
  async addCriptoDataIds(@Body() body: { idsCMC: number[] }) {
    return await this.createCriptoService.addCriptoDataIds(body.idsCMC)
  }

  @UseGuards(AuthGuardAdmin)
  @Put('add-infos')
  async fetchAndSaveData() {
    return await this.automaticCronService.fetchAndSaveCryptocurrencyData()
  }

  @UseGuards(AuthGuardAdmin)
  @Delete('delete/:idCMC')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCriptoData(@Param('idCMC', ParseIntPipe) idCMC: number) {
    await this.deleteCriptoService.deleteCripto(idCMC)
  }

  @UseGuards(AuthGuardAdmin)
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

  @UseGuards(AuthGuardAdmin)
  @Post('buy-sell/add')
  async addBuyAndSell(@Body() body: { criptoId: string; qnt: number }) {
    return await this.createCriptoService.addBuyAndSell(body.criptoId, body.qnt)
  }

  @UseGuards(AuthGuardAdmin)
  @Delete('buy-sell/delete')
  async deleteBuyAndSell(@Body() body: { id: string }) {
    return await this.deleteCriptoService.deleteBuyAndSell(body.id)
  }

  @UseGuards(AuthGuardAdmin)
  @Get('buy-sell/get-all')
  async getAllBuyAndSell() {
    return await this.readCriptoService.getAllBuyAndSell()
  }

  @UseGuards(AuthGuardAdmin)
  @Get('buy-sell/get-filtred')
  async getFiltredBuyAndSell(@Body() body: { criptoId: string }) {
    return await this.readCriptoService.getFiltredBuyAndSell(body.criptoId)
  }

  @UseGuards(AuthGuardAdmin)
  @Patch('visibility/:id')
  async updateVisibility(
    @Param('id') id: string,
    @Body('isVisible') isVisible: boolean,
  ) {
    return this.updateCriptoService.updateVisibility(id, isVisible)
  }

  @UseGuards(UseGuards)
  @Get('get-global-market')
  async fetchHistoricalQuotes() {
    return this.readCriptoService.fetchHistoricalQuotes
  }
}
