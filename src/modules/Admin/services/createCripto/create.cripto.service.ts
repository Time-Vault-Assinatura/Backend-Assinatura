import { Injectable } from '@nestjs/common'
import { AdminCreateModel } from '../../models/admin.create'
import { AdminUpdateModel } from '../../models/admin.update'
import { AdminReadModel } from '../../models/admin.read'
import { AutomaticCronService } from '../automaticCron/automaticCron.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class CreateCriptoService {
  constructor(
    private readonly adminCreateModel: AdminCreateModel,
    private readonly AutomaticCronService: AutomaticCronService,
    private readonly adminUpdateModel: AdminUpdateModel,
    private readonly adminReadModel: AdminReadModel,
  ) {}

  async addCriptoDataIds(idsCMC: number[]) {
    if (!idsCMC.every((id) => Number.isInteger(id) && id > 0)) {
      throw new Error('Todos os idsCMC devem ser inteiros positivos.')
    }

    try {
      const result = await this.adminCreateModel.addCriptoDataIds(idsCMC)
      await this.AutomaticCronService.fetchAndSaveCryptocurrencyData()
      return {
        message: `${result.count} novo(s) idCMC(s) adicionado(s).`,
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            return {
              message: 'Alguns idsCMC estavam duplicados e foram ignorados.',
            }
          default:
            console.error('Erro do Prisma:', error)
            throw new Error('Erro ao adicionar idsCMC ao banco de dados.')
        }
      } else {
        console.error('Erro desconhecido:', error)
        throw new Error('Um erro desconhecido ocorreu.')
      }
    }
  }

  async addBuyAndSell(criptoId: string, qnt: number) {
    // precisa adicionar uma validação para garantir que o id da cripto exista
    try {
      await this.adminCreateModel.addBuyAndSell(criptoId, qnt)
      await this.adminUpdateModel.updateCriptoQuantity()
      return {
        message: `A cripto ${criptoId} foi comprada ou vendida na quantidade de ${qnt}`,
      }
    } catch (error) {
      throw new Error('Erro')
    }
  }
}
