// modelGet.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';

@Injectable()
export class ModelGet {
    constructor(private prismaService: PrismaService) { }

    async getCriptoData(idCMC: number) {
        try {
            const criptoData = await this.prismaService.criptoData.findUnique({
                where: { idCMC },
            });
            return criptoData;
        } catch (error) {
            console.error("Erro ao buscar dados da criptomoeda:", error);
            throw error;
        }
    }

    // Método para buscar todos os dados de criptomoedas
    async getAllCriptoData() {
        try {
            const allCriptoData = await this.prismaService.criptoData.findMany();
            return allCriptoData;
        } catch (error) {
            console.error("Erro ao buscar todos os dados de criptomoedas:", error);
            throw error;
        }
    }

    async getAllCriptoDataFiltred() {
        try {
            const allCriptoData = await this.prismaService.criptoData.findMany({
                where: {
                    idCMC: { not: null },
                    ticker: { not: null },
                    precoAtual: { not: null },
                    alocacao: { not: null },
                    alocacaoAtual: { not: null },
                    rentabilidade: { not: null },
                    vies: { not: null },
                }
            });
            return allCriptoData;
        } catch (error) {
            console.error("Erro ao buscar dados de criptomoedas sem campos nulos:", error);
            throw error;

        }
    }
}