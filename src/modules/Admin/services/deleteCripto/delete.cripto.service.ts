import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AdminDeleteModel } from '../../models/admin.delete';
import { AdminUpdateModel } from '../../models/admin.update';

@Injectable()
export class DeleteCriptoService {
  constructor(
    private readonly adminDeleteModel: AdminDeleteModel,
    private readonly adminUpdateModel: AdminUpdateModel,
  ) {}

  async deleteCripto(id: string) {
    try {
      const result = await this.adminDeleteModel.deleteCripto(id);
      if (!result) {
        throw new HttpException('Criptomoeda não encontrada.', HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Criptomoeda não encontrada.', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao deletar a criptomoeda.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteBuyAndSell(id: string) {
    try {
      const result = await this.adminDeleteModel.deleteBuyAndSell(id);
      if (!result) {
        throw new HttpException('Compra e venda não encontrada.', HttpStatus.NOT_FOUND);
      }
      await this.adminUpdateModel.updateCriptoQuantity();
      return {
        message: `A transação com id = ${id} foi deletada com sucesso!`,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Compra e venda não encontrada.', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Erro ao deletar a transação.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
// vai para main