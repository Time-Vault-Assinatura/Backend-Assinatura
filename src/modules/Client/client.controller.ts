import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { GetAllCriptoService } from './services/getAllCripto/getAllCripto.service'
import { AuthGuardUser } from 'src/guards/auth-user.guard'
import { UserDataService } from './services/getUserData.service.ts/getUserData'

@Controller('user')
export class ClientController {
  constructor(
    private readonly getAllCriptoService: GetAllCriptoService,
    private readonly userDataService: UserDataService,
  ) {}

  @UseGuards(AuthGuardUser)
  @Get('filtred-cripto')
  async getAllNonNullCriptoData() {
    return this.getAllCriptoService.getAllNonNullCriptoData()
  }

  @UseGuards(AuthGuardUser)
  @Get('user-data')
  async getUserData(@Query('email') email: string) {
    return this.userDataService.getUserData(email)
  }

  @Get('vault-rentability')
  async getRendimento() {
    return await this.userDataService.calculateGeralRentability()
  }
}
