import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AdminCreateModel } from '../../models/admin.create'
import { AdminUpdateModel } from '../../models/admin.update'
import { AdminReadModel } from '../../models/admin.read'
import { AutomaticCronService } from '../automaticCron/automaticCron.service'

@Injectable()
export class CreateCriptoService {
  constructor(
    private readonly adminCreateModel: AdminCreateModel,
    private readonly AutomaticCronService: AutomaticCronService,
    private readonly adminUpdateModel: AdminUpdateModel,
    private readonly adminReadModel: AdminReadModel,
  ) {}

  async addCriptoDataIds(idsCMC: number[]) {
    if (!idsCMC.every((id) => Number.isInteger(id) && id >= 0)) {
    throw new HttpException('Todos os idsCMC devem ser inteiros positivos.', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.adminCreateModel.addCriptoDataIds(idsCMC)
      await this.AutomaticCronService.fetchAndSaveCryptocurrencyData()
      return {
        message: `${result.count} novo(s) idCMC(s) adicionado(s).`,
      }
    } catch (error) {
      console.error('Erro desconhecido:', error)
      throw new HttpException('Um erro desconhecido ocorreudurante a adição de cripto IDs.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async addBuyAndSell(criptoId: string, qnt: number) {
    // precisa adicionar uma validação para garantir que o id da cripto exista
    const allCriptoData = await this.adminReadModel.getAllCriptoData();

    const criptoExists = allCriptoData.some(data => data.id === criptoId);
    if (!criptoExists) {
      throw new HttpException(`A criptomoeda com ID ${criptoId} não existe.`, HttpStatus.BAD_REQUEST);
    }

    if (typeof qnt !== 'number') {
      throw new HttpException('Quantidade deve ser um número.', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.adminCreateModel.addBuyAndSell(criptoId, qnt)
      await this.adminUpdateModel.updateCriptoQuantity()
      return {
        message: `A cripto ${criptoId} foi comprada ou vendida na quantidade de ${qnt}`,
      }
    } catch (error) {
      console.error('Erro desconhecido:', error)
    throw new HttpException('Erro desconhecido ao processar a compra/venda.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
