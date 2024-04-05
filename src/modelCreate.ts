// createCriptoData.service.ts
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/Prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ModelCreate {
  constructor(private prismaService: PrismaService) {}

  async createCriptoData(criptoData: {
    idCMC: number
    name: string
    price: number
    marketCap: number
    volume24h: number
    percentChange24h: number
  }) {
    try {
      await this.prismaService.criptoData.create({
        data: {
          idCMC: criptoData.idCMC,
          ticker: criptoData.name,
          precoAtual: criptoData.price.toString(),
        },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(`Um registro com idCMC ${criptoData.idCMC} já existe.`)
          // Aqui você pode decidir ignorar, atualizar o registro existente ou tomar outra ação
        } else {
          // Tratamento de outros erros
          console.log('Ocorreu um erro:', error)
        }
      } else {
        // Tratamento para outros tipos de erro não relacionados ao Prisma
        console.error('Erro desconhecido:', error)
      }
    }
  }

  async addCriptoDataIds(idsCMC: number[]) {
    try {
      // Prepara os dados para inserção
      const dataToInsert = idsCMC.map((idCMC) => ({
        idCMC,
        // Pode adicionar outros campos padrão aqui, se necessário
      }))

      // Utiliza createMany para inserir vários registros de uma vez
      const result = await this.prismaService.criptoData.createMany({
        data: dataToInsert,
        skipDuplicates: true, // Ignora os registros duplicados baseado na chave única
      })

      return { count: result.count }
    } catch (error) {
      console.error('Erro ao adicionar idsCMC:', error)
      throw error
    }
  }
}
