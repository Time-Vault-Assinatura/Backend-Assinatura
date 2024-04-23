import { Controller, Get, Query, UseGuards, Param } from '@nestjs/common'
import { GetAllCriptoService } from './services/getAllCripto/getAllCripto.service'
import { AuthGuardUser } from 'src/guards/auth-user.guard'
import { UserDataService } from './services/getUserData/getUserData.service'
import { Wallets } from '../Admin/DTO/wallet.dto'

@Controller('user')
export class ClientController {
  constructor(
    private readonly getAllCriptoService: GetAllCriptoService,
    private readonly userDataService: UserDataService,
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

  @Get('rentability/:wallet')
  async getRendimento(@Param('wallet') wallet: Wallets) {
    return await this.getAllCriptoService.calculateWalletRentability(wallet)
  }

  @UseGuards(AuthGuardUser)
  @Get('get-global-market')
  async fetchHistoricalQuotes() {
    return this.getAllCriptoService.fetchHistoricalQuotes()
  }
}
