import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/Prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ModelUpdate {
  constructor(private prismaService: PrismaService) {}

  async UpdateCriptoData(criptoData: {
    idCMC: number
    name: string
    price: number
    marketCap: number
    volume24h: number
    percentChange24h: number
  }) {
    try {
      await this.prismaService.criptoData.upsert({
        where: {
          idCMC: criptoData.idCMC, // Condição para encontrar o registro existente
        },
        update: {
          // Campos para atualizar se o registro existir
          ticker: criptoData.name, // Atualiza o ticker
          precoAtual: criptoData.price.toString(), // Atualiza o preço atual
          // Não é necessário atualizar o idCMC aqui
        },
        create: {
          // Dados para criar um novo registro se não existir
          idCMC: criptoData.idCMC,
          ticker: criptoData.name,
          precoAtual: criptoData.price.toString(),
          // Inclua os outros campos conforme necessário
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Aqui você pode lidar com erros conhecidos do Prisma
        console.error('Erro do Prisma:', error.message)
      } else {
        // Tratamento para outros tipos de erro não relacionados ao Prisma
        console.error('Erro desconhecido:', error)
      }
    }
  }

  async teamUpdateCriptoDetails(criptoDetails: {
    idCMC: number
    entrada: string
    alocacao: string
    vies: string
  }) {
    try {
      // Use "data" para especificar os campos a serem atualizados
      await this.prismaService.criptoData.update({
        where: {
          idCMC: criptoDetails.idCMC,
        },
        data: {
          // Corrigido de "update" para "data"
          entrada: criptoDetails.entrada,
          alocacao: criptoDetails.alocacao,
          vies: criptoDetails.vies,
        },
      })
    } catch (error) {
      console.error('Erro ao atualizar detalhes da criptomoeda:', error)
      throw error
    }
  }
}
