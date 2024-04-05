import { Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'

@Injectable()
export class GetAllCriptoService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getAllNonNullCriptoData() {
    const allCriptoDataFiltred =
      await this.clientReadModel.getAllCriptoDataFiltred()

    if (allCriptoDataFiltred.length === 0) {
      return 'Nenhum dado de criptomoeda encontrado sem campos nulos.'
    }

    return allCriptoDataFiltred
  }
}
