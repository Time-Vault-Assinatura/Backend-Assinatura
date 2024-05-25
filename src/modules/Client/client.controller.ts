import {
  Controller,
  Get,
  Query,
  UseGuards,
  Param,
  Post,
  Body,
  Req,
} from '@nestjs/common'
import { GetAllCriptoService } from './services/getAllCripto/getAllCripto.service'
import { AuthGuardUser } from 'src/guards/auth-user.guard'
import { UserDataService } from './services/getUserData/getUserData.service'
import { Wallets } from '../Admin/DTO/wallet.dto'
import { CreateUserService } from './services/createClientData/create.client.service'
import { TRequest } from './DTO/uuid.dto'

@Controller('user')
export class ClientController {
  constructor(
    private readonly getAllCriptoService: GetAllCriptoService,
    private readonly userDataService: UserDataService,
    private readonly createUserService: CreateUserService,
  ) {}

  @UseGuards(AuthGuardUser)
  @Get('visible-cripto/:wallet')
  async getAllVisibleCriptoData(@Param('wallet') wallet: Wallets) {
    return this.getAllCriptoService.getAllVisibleCriptoData(wallet)
  }

  @UseGuards(AuthGuardUser)
  @Get('user-data')
  async getUserData(@Query('email') email: string) {
    return this.userDataService.getUserData(email)
  }

  @UseGuards(AuthGuardUser)
  @Get('rentability/:wallet')
  async getRendimento(@Param('wallet') wallet: Wallets) {
    return await this.getAllCriptoService.calculateWalletRentability(wallet)
  }

  @UseGuards(AuthGuardUser)
  @Get('get-global-market')
  async fetchHistoricalQuotes() {
    return this.getAllCriptoService.fetchHistoricalQuotes()
  }

  @UseGuards(AuthGuardUser)
  @Post('add-feedback')
  async addFeedback(
    @Req() req,
    @Body()
    body: { categoria: string; assunto: string; feedback: string; nps: string },
  ) {
    return await this.createUserService.addFeedback(
      req.uuid,
      body.categoria,
      body.assunto,
      body.feedback,
      body.nps,
    )
  }

  @UseGuards(AuthGuardUser)
  @Get('get-all-videos')
  async getAllVideos() {
    return await this.readVideoService.getAllVideos()
  }

  @UseGuards(AuthGuardUser)
  @Patch('update-view')
  async toggleVideoView(
    @Req() req,
    @Body()
    body: {
      videoId: string
      viewed: boolean
    },
  ) {
    return await this.updateVideoService.updateVideoView(
      req.uuid,
      body.videoId,
      body.viewed,
    )
  }

  @UseGuards(AuthGuardUser)
  @Get('get-view')
  async getVideosView() {
    return await this.readVideoService.getVideosView()
  }
}
