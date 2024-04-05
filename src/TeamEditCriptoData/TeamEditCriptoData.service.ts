import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ModelCreate } from 'src/modelCreate';
import { Prisma } from '@prisma/client';
import { ModelUpdate } from 'src/modelUpdate';
import { ModelDelete } from 'src/modelDelete';
import { ModelGet } from 'src/modelGet';
import { CriptoDataService } from 'src/CriptoData/CriptoData.service';

@Injectable()
export class TeamEditCriptoDataService {
    constructor(
        private httpService: HttpService,
        private prismaService: PrismaService,
        private modelCreate: ModelCreate,
        private modelUpdate: ModelUpdate,
        private modelDelete: ModelDelete,
        private modelGet: ModelGet,
        private criptoDataService: CriptoDataService
    ) { }

    async addCriptoDataIds(idsCMC: number[]) {
        if (!idsCMC.every(id => Number.isInteger(id) && id > 0)) {
            throw new Error('Todos os idsCMC devem ser inteiros positivos.');
        }

        try {
            const result = await this.modelCreate.addCriptoDataIds(idsCMC);
            await this.criptoDataService.fetchAndSaveCryptocurrencyData();
            return {
                message: `${result.count} novo(s) idCMC(s) adicionado(s).`,
            };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        return { message: 'Alguns idsCMC estavam duplicados e foram ignorados.' };
                    default:
                        console.error('Erro do Prisma:', error);
                        throw new Error('Erro ao adicionar idsCMC ao banco de dados.');
                }
            } else {
                console.error('Erro desconhecido:', error);
                throw new Error('Um erro desconhecido ocorreu.');
            }
        }
    }

    async deleteCriptoData(idCMC: number) {
        if (!Number.isInteger(idCMC) || idCMC <= 0) {
            throw new Error('O ID fornecido é inválido. Deve ser um número inteiro positivo.');
        }

        const criptoData = await this.modelGet.getCriptoData(idCMC);
        if (!criptoData) {
            throw new Error(`Nenhum dado encontrado para o ID ${idCMC}.`);
        }

        return this.modelDelete.deleteCripto(idCMC);
    }

    async teamUpdateCriptoDetails(criptoDetails: {
        idCMC: number,
        entrada?: string,
        alocacao?: string,
        vies?: string,
        quantidade?: string,  // Adicionando o campo quantidade
    }) {
        const updateData: {
            entrada?: string;
            alocacao?: string;
            vies?: string;
            quantidade?: string;  // Adicionando o campo quantidade
        } = {};

        if (criptoDetails.entrada !== undefined) {
            updateData['entrada'] = criptoDetails.entrada;
        }

        if (criptoDetails.alocacao !== undefined) {
            updateData['alocacao'] = criptoDetails.alocacao;
        }

        if (criptoDetails.vies !== undefined) {
            updateData['vies'] = criptoDetails.vies;
        }

        // Adicionar a lógica para atualizar a quantidade
        if (criptoDetails.quantidade !== undefined) {
            updateData['quantidade'] = criptoDetails.quantidade;
        }

        try {
            await this.prismaService.criptoData.update({
                where: { idCMC: criptoDetails.idCMC },
                data: updateData,
            });
        } catch (error) {
            console.error("Erro ao atualizar detalhes da criptomoeda:", error);
            throw error;
        }
    }
}