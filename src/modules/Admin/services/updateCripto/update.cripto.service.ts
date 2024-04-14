import { Injectable } from '@nestjs/common'
import { AdminUpdateModel } from '../../models/admin.update'

@Injectable()
export class UpdateCriptoService {
  constructor(private readonly adminUpdateModel: AdminUpdateModel) {}

  async updateEntryAndAllocation(criptoDetails: {
    idCMC: number
    entrada?: string
    alocacao?: string
  }) {
    const updateData: {
      entrada?: string
      alocacao?: string
    } = {}

    if (criptoDetails.entrada !== undefined) {
      updateData.entrada = criptoDetails.entrada
    }

    if (criptoDetails.alocacao !== undefined) {
      updateData.alocacao = criptoDetails.alocacao
    }

    try {
      await this.adminUpdateModel.updateCriptoEntryAndAllocation(
        criptoDetails.idCMC,
        updateData.entrada,
        updateData.alocacao,
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
