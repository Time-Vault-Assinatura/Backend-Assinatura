import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { Wallets } from '../DTO/wallet.dto'

@Injectable()
export class AdminUpdateModel {
  constructor(private readonly prismaService: PrismaService) {}

  async updateCriptoNameAndPrice(idCMC: number, name: string, price: number) {
    try {
      await this.prismaService.cripto_data.updateMany({
        where: {
          idCMC,
        },
        data: {
          ticker: name,
          precoAtual: price.toString(),
        },
      })
    } catch (error) {}
  }

  async updateCriptoImage(idCMC: number, imagem: string) {
    try {
      await this.prismaService.cripto_data.updateMany({
        where: {
          idCMC,
        },
        data: {
          imagem,
        },
      })
    } catch (error) {
      console.error('Error updating cripto image:', error)
    }
  }

  async updateValueInvestment(id: string, valorInvestido: number) {
    // TODO: Colocar no Try
    await this.prismaService.cripto_data.update({
      where: { id },
      data: { valorInvestido: String(valorInvestido) },
    })
  }

  async updateAlocationCurrent(id: string, alocacaoAtual: number) {
    // TODO: Colocar no Try
    await this.prismaService.cripto_data.update({
      where: { id },
      data: { alocacaoAtual: String(alocacaoAtual) },
    })
  }

  async updateRentability(id: string, rentabilidade: number) {
    await this.prismaService.cripto_data.update({
      where: { id },
      data: { rentabilidade: String(rentabilidade) },
    })
  }

  async updateBias(id: string, vies: string) {
    // TODO: Colocar no Try
    await this.prismaService.cripto_data.update({
      where: { id },
      data: { vies },
    })
  }

  async updateCriptoEntryAndAllocation(
    id: string,
    updateData: { entrada?: string; alocacao?: string; data_entrada?: string }, // Usando string para data_entrada
  ) {
    try {
      await this.prismaService.cripto_data.update({
        where: { id },
        data: updateData,
      })
    } catch (error) {
      console.error('Erro ao atualizar detalhes da criptomoeda:', error)
      throw error
    }
  }

  async updateCriptoQuantity() {
    const criptos = await this.prismaService.cripto_data.findMany({
      include: {
        Historic_buy_sell: true, // Inclui os dados relacionados de Historic_buy_sell
      },
    }) // backend

    for (const cripto of criptos) {
      const somaQnt = cripto.Historic_buy_sell.reduce(
        (acc, curr) => acc + curr.qnt,
        0,
      )

      await this.prismaService.cripto_data.update({
        where: { id: cripto.id },
        data: { quantidade: somaQnt.toString() }, // Atualiza a quantidade na tabela Cripto_data
      })
    }
  }

  async updateCriptoDataVisibility(id: string, isVisible: boolean) {
    try {
      await this.prismaService.cripto_data.update({
        where: {
          id,
        },
        data: {
          isVisible,
        },
      })
    } catch (error) {
      console.error('Erro ao atualizar visibilidade da cripto', error)
      throw error
    }
  }

  async updateWallet(id: string, wallet: Wallets) {
    try {
      await this.prismaService.cripto_data.update({
        where: {
          id,
        },
        data: {
          wallet,
        },
      })
    } catch (error) {
      console.error('Erro ao atualizar a carteira do ativo', error)
      throw error
    }
  }
}
