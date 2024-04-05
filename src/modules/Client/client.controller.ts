import { Controller, Get } from '@nestjs/common'
import { GetAllCriptoService } from './services/getAllCripto/getAllCripto.service'

@Controller('user')
export class ClientController {
  constructor(private readonly getAllCriptoService: GetAllCriptoService) {}

  @Get('filtred-cripto')
  async getAllNonNullCriptoData() {
    return this.getAllCriptoService.getAllNonNullCriptoData()
  }
}
