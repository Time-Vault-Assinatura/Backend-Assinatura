import { Injectable } from '@nestjs/common'

import { AdminReadModel } from '../../models/admin.read'

@Injectable()
export class ReadCriptoService {
  constructor(private readonly adminReadModel: AdminReadModel) {}

  async getAllCriptoData() {
    const allCriptoData = await this.adminReadModel.getAllCriptoData()

    if (allCriptoData.length === 0) {
      return 'Nenhum dado de criptomoeda encontrado.'
    }

    return allCriptoData
  }
}
