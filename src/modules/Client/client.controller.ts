import { Controller, Get, UseGuards } from '@nestjs/common'
import { GetAllCriptoService } from './services/getAllCripto/getAllCripto.service'
import { AuthGuardUser } from 'src/guards/auth-user.guard'

@Controller('user')
export class ClientController {
  constructor(private readonly getAllCriptoService: GetAllCriptoService) {}

  @UseGuards(AuthGuardUser)
  @Get('filtred-cripto')
  async getAllNonNullCriptoData() {
    return this.getAllCriptoService.getAllNonNullCriptoData()
  }
}
