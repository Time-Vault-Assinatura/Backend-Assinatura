import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/config/prisma/prisma.service'

@Injectable()
export class AdminCreateModel {
  constructor(private readonly prismaService: PrismaService) {}

  async addCriptoDataIds(idsCMC: number[]) {
    try {
      // Prepara os dados para inserção
      const dataToInsert = idsCMC.map((idCMC) => ({
        idCMC,
        // Pode adicionar outros campos padrão aqui, se necessário
      }))

      // Utiliza createMany para inserir vários registros de uma vez
      const result = await this.prismaService.cripto_data.createMany({
        data: dataToInsert,
        skipDuplicates: true, // Ignora os registros duplicados baseado na chave única
      })

      return { count: result.count }
    } catch (error) {
      console.error('Erro ao adicionar idsCMC:', error)
      throw error
    }
  }

  async addBuyAndSell(criptoId: string, qnt: number) {
    try {
      const result = await this.prismaService.historic_buy_sell.createMany({
        data: [{ criptoId, qnt }], // Note que data espera um array de objetos
      })
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
