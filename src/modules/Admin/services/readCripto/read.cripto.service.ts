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

  async getAllBuyAndSell() {
    const allBuyAndSell = await this.adminReadModel.getAllBuyAndSell()

    if (allBuyAndSell.length === 0) {
      return 'Nenhuma compra e venda encontrada'
    }
    return allBuyAndSell
  }

  async getFiltredBuyAndSell(criptoId: string) {
    const filtredBuyAndSell =
      await this.adminReadModel.getFiltredBuyAndSell(criptoId)

    if (filtredBuyAndSell.length === 0) {
      return 'Nenhuma compra e venda encontrada para essa moeda'
    }
    return filtredBuyAndSell
  }
}
