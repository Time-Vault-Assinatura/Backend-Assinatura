import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AdminUpdateModel } from '../../models/admin.update'
import { Wallets } from '../../DTO/wallet.dto'
import { AdminReadModel } from '../../models/admin.read'

@Injectable()
export class UpdateCriptoService {
  constructor(
    private readonly adminUpdateModel: AdminUpdateModel,
    private readonly adminReadModel: AdminReadModel,
  ) {}

  async updateEntryAndAllocation(criptoDetails: {
    id: string
    entrada?: string
    alocacao?: string
    data_entrada?: Date | string
  }) {
    if (!(await this.adminReadModel.existsCripto(criptoDetails.id))) {
      throw new HttpException(
        `Criptomoeda com ID ${criptoDetails.id} não encontrada.`,
        HttpStatus.NOT_FOUND,
      )
    }

    const updateData: {
      entrada?: string
      alocacao?: string
      data_entrada?: string
    } = {}

    if (criptoDetails.entrada !== undefined) {
      updateData.entrada = criptoDetails.entrada
    }

    if (criptoDetails.alocacao !== undefined) {
      updateData.alocacao = criptoDetails.alocacao
    }

    if (criptoDetails.data_entrada !== undefined) {
      updateData.data_entrada =
        criptoDetails.data_entrada instanceof Date
          ? criptoDetails.data_entrada.toISOString()
          : criptoDetails.data_entrada
    }

    try {
      const result = await this.adminUpdateModel.updateCriptoEntryAndAllocation(
        criptoDetails.id,
        updateData,
      )
      return result 
    } catch (error) {
      console.error('Erro ao atualizar detalhes da criptomoeda:', error)
      throw new HttpException(
        'Falha ao atualizar detalhes da criptomoeda.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async updateVisibility(id: string, isVisible: boolean) {
    if (!(await this.adminReadModel.existsCripto(id))) {
      throw new HttpException(
        `Criptomoeda com ID ${id} não encontrada.`,
        HttpStatus.NOT_FOUND,
      )
    }

    try {
      const result = await this.adminUpdateModel.updateCriptoDataVisibility(
        id,
        isVisible,
      )
      return result 
    } catch (error) {
      console.error('Error updating crypto visibility:', error)
      throw new HttpException(
        'Falha ao atualizar visibilidade da criptomoeda.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async updateWallet(id: string, wallet: Wallets) {
    if (!(await this.adminReadModel.existsCripto(id))) {
      throw new HttpException(
        `Criptomoeda com ID ${id} não encontrada.`,
        HttpStatus.NOT_FOUND,
      )
    }

    const validWallets: Wallets[] = ['CONSERVADORA', 'MODERADA', 'ARROJADA']
    if (!validWallets.includes(wallet)) {
      throw new HttpException(
        `Tipo de carteira inválido. Tipos de carteira validos: ${validWallets.join(', ')}.`,
        HttpStatus.BAD_REQUEST,
      )
    }

    try {
      const result = await this.adminUpdateModel.updateWallet(id, wallet)
      return  result 
    } catch (error) {
      console.error('Erro ao selecionar a carteira do ativo:', error)
      throw new HttpException(
        'Falha ao atualizar a carteira.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
