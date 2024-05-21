import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class AdminReadModel {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCriptoData() {
    try {
      const allCriptoData = await this.prismaService.cripto_data.findMany()
      return allCriptoData
    } catch (error) {
      console.error('Erro ao buscar todos os dados de criptomoedas:', error)
      throw error
    }
  }

  async getAllCriptoDataWherePriceAndQuantityIsNotNull() {
    // TODO: try catch
    const criptoDatas = await this.prismaService.cripto_data.findMany({
      where: {
        precoAtual: { not: null },
        quantidade: { not: null },
      },
    })

    return criptoDatas
  }

  async getAllCriptoDataWherePriceAndEntryIsNotNull() {
    // TODO: try catch
    const criptoDatas = await this.prismaService.cripto_data.findMany({
      where: {
        precoAtual: { not: null },
        entrada: { not: null },
      },
    })

    return criptoDatas
  }

  async getAllCriptoDataWhereAllocationAndCurrentAllocationIsNotNull() {
    // TODO: try catch
    const criptoDatas = await this.prismaService.cripto_data.findMany({
      where: {
        alocacao: { not: null },
        alocacaoAtual: { not: null },
      },
    })

    return criptoDatas
  }

  async getAllBuyAndSell() {
    try {
      const allBuyAndSell =
        await this.prismaService.historic_buy_sell.findMany()
      return allBuyAndSell
    } catch (error) {
      console.error('Error ao buscar compras e vendas:', error)
      throw error
    }
  }

  async getFiltredBuyAndSell(criptoId: string) {
    const filtredBuyAndSell =
      await this.prismaService.historic_buy_sell.findMany({
        where: {
          criptoId,
        },
      })
    return filtredBuyAndSell
  }

  async getAllFeedbacks() {
    try {
      const result = await this.prismaService.feedbacks.findMany()
      return result
    } catch (error) {
      console.error('erro ao buscar os feedbacks de ususario', error)
      throw error
    }
  }

  async existsCripto(id: string): Promise<boolean> {
  const count = await this.prismaService.cripto_data.count({
    where: {
      id: id,
    }
  });
  return count > 0;
}
}
