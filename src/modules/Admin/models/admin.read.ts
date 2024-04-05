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
}
