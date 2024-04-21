import { Injectable } from '@nestjs/common'
import { ClientReadModel } from '../../models/client.read'
import { Wallets } from '@prisma/client'

@Injectable()
export class GetAllCriptoService {
  constructor(private readonly clientReadModel: ClientReadModel) {}

  async getAllVisibleCriptoData(wallet: Wallets) {
    const allCriptoDataFiltred =
      await this.clientReadModel.getAllCriptoDataFiltred(wallet)

    if (allCriptoDataFiltred.length === 0) {
      return 'Nenhum dado de criptomoeda encontrado sem campos nulos.'
    }

    return allCriptoDataFiltred
  }

  public async calculateWalletRentability(wallet: Wallets) {
    const criptoDatas =
      await this.clientReadModel.getAllCriptoDataFiltred(wallet)
    const totalInvested = criptoDatas.reduce(
      (acc, cripto) => acc + parseFloat(cripto.valorInvestido),
      0,
    )
    const rendimento = ((totalInvested - 2000) / 2000) * 100

    return {
      totalInvested,
      rendimento,
    }
  }
}
