import { Injectable } from '@nestjs/common'
import { AdminUpdateModel } from '../../models/admin.update'

@Injectable()
export class UpdateCriptoService {
  constructor(private readonly adminUpdateModel: AdminUpdateModel) {}

  async updateEntryAndAllocation(criptoDetails: {
    id: string
    entrada?: string
    alocacao?: string
    data_entrada?: Date | string // Permitindo Date ou string
  }) {
    const updateData: {
      entrada?: string
      alocacao?: string
      data_entrada?: string // Corrigido para data_entrada
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
      await this.adminUpdateModel.updateCriptoEntryAndAllocation(
        criptoDetails.id,
        updateData,
      )
    } catch (error) {
      console.error('Erro ao atualizar detalhes da criptomoeda:', error)
      throw error
    }
  }

  async updateVisibility(id: string, isVisible: boolean) {
    try {
      await this.adminUpdateModel.updateCriptoDataVisibility(id, isVisible)
    } catch (error) {
      console.error('Error updating crypto visibility:', error)
      throw error
    }
  }
}
