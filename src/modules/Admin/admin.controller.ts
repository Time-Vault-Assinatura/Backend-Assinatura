import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Patch,
  Put,
  Get,
  UseGuards,
  BadRequestException,
} from '@nestjs/common'
import { ReadCriptoService } from './services/readCripto/read.cripto.service'
import { CreateCriptoService } from './services/createCripto/create.cripto.service'
import { AutomaticCronService } from './services/automaticCron/automaticCron.service'
import { DeleteCriptoService } from './services/deleteCripto/delete.cripto.service'
import { UpdateCriptoService } from './services/updateCripto/update.cripto.service'
import { AuthGuardAdmin } from 'src/guards/auth-admin.guard'
import { Wallets } from './DTO/wallet.dto'
import { ReadUserService } from './services/readUser/read.user.service'
import { CreateVideoService } from './services/createVideo/create.video.service'
import { UpdateVideoService } from './services/updateVideo/update.video.service'
import { DeleteVideoService } from './services/deleteVideo/delete.video.service'
import { ReadVideoService } from './services/readVideos/read.video.service'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly readCriptoService: ReadCriptoService,
    private readonly createCriptoService: CreateCriptoService,
    private readonly automaticCronService: AutomaticCronService,
    private readonly deleteCriptoService: DeleteCriptoService,
    private readonly updateCriptoService: UpdateCriptoService,
    private readonly readUserService: ReadUserService,
    private readonly createVideoService: CreateVideoService,
    private readonly updateVideoService: UpdateVideoService,
    private readonly deleteVideoService: DeleteVideoService,
    private readonly readVideoService: ReadVideoService,
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
  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCriptoData(@Param('id') id: string) {
    await this.deleteCriptoService.deleteCripto(id)
  }

  @UseGuards(AuthGuardAdmin)
  @Patch('update-details/:id')
  async updateCriptoDetails(
    @Param('id') id: string,
    @Body()
    body: {
      entrada?: string
      alocacao?: string
      data_entrada?: Date
    },
  ) {
    return await this.updateCriptoService.updateEntryAndAllocation({
      id,
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

  @UseGuards(AuthGuardAdmin)
  @Put('update-wallet')
  async updateWallet(@Body() body: { id: string; wallet: Wallets }) {
    const validWallets = ['CONSERVADORA', 'MODERADA', 'ARROJADA']
    if (!validWallets.includes(body.wallet)) {
      throw new BadRequestException('Invalid wallet type.')
    }
    return this.updateCriptoService.updateWallet(body.id, body.wallet)
  }

  @UseGuards(AuthGuardAdmin)
  @Get('get-all-feedbacks')
  async getAllFeedbacks() {
    return await this.readUserService.getAllFeedbacks()
  }

  @UseGuards(AuthGuardAdmin)
  @Get('cripto-images')
  async getCriptoImages() {
    return await this.automaticCronService.fetchAndSaveCryptocurrencyImage()
  }

  //   @UseGuards(AuthGuardAdmin)
  @Post('add-video')
  async addVideo(
    @Body()
    videoInfo: {
      module: string
      className: string
      classOrder: number
      classDescription: string
      classTime: string
      videoUrl: string
      bannerUrl?: string
      isVisible?: boolean
    },
  ) {
    return await this.createVideoService.addVideo(videoInfo)
  }

  //   @UseGuards(AuthGuardAdmin)
  @Patch('update-video')
  async updateVideo(
    @Body()
    videoInfo: {
      id: string
      module?: string
      className?: string
      classOrder?: number
      classDescription?: string
      classTime?: string
      videoUrl?: string
      bannerUrl?: string
      isVisible?: boolean
    },
  ) {
    return await this.updateVideoService.updateVideo(videoInfo)
  }

  //   @UseGuards(AuthGuardAdmin)
  @Delete('delete-video')
  async deleteVideo(
    @Body()
    body: {
      id: string
    },
  ) {
    return await this.deleteVideoService.deleteVideo(body.id)
  }

  @Get('get-all-videos')
  async getAllVideos() {
    return await this.readVideoService.getAllVideos()
  }
}
