import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AdminCreateModel } from '../../models/admin.create'

@Injectable()
export class CreateUpdateService {
  constructor(private readonly adminCreateModel: AdminCreateModel) {}

  async createUpdate(update: string, updateDate: string) {
    try {
      await this.adminCreateModel.addUpdate(update, updateDate)
      return {
        statusCode: HttpStatus.OK,
        message: 'Atualização adicionada com sucesso.',
      }
    } catch (error) {
      console.error('Erro desconhecido:', error)
      throw new HttpException(
        'Erro desconhecido ao processar a compra/venda.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
