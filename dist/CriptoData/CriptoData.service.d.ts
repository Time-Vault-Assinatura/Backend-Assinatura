import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ModelCreate } from 'src/modelCreate';
import { ModelUpdate } from 'src/modelUpdate';
import { ModelGet } from 'src/modelGet';
export declare class CriptoDataService {
    private httpService;
    private prismaService;
    private modelCreate;
    private modelUpdate;
    private modelGet;
    constructor(httpService: HttpService, prismaService: PrismaService, modelCreate: ModelCreate, modelUpdate: ModelUpdate, modelGet: ModelGet);
    fetchAndSaveCryptocurrencyData(): Promise<void>;
    getCriptoData(idCMC: number): Promise<{
        id: string;
        idCMC: number;
        ticker: string;
        entrada: string;
        precoAtual: string;
        alocacao: string;
        alocacaoAtual: string;
        rentabilidade: string;
        vies: string;
        quantidade: string;
        valorInvestido: string;
    }>;
    getAllCriptoData(): Promise<{
        id: string;
        idCMC: number;
        ticker: string;
        entrada: string;
        precoAtual: string;
        alocacao: string;
        alocacaoAtual: string;
        rentabilidade: string;
        vies: string;
        quantidade: string;
        valorInvestido: string;
    }[]>;
    getAllNonNullCriptoData(): Promise<{
        id: string;
        idCMC: number;
        ticker: string;
        entrada: string;
        precoAtual: string;
        alocacao: string;
        alocacaoAtual: string;
        rentabilidade: string;
        vies: string;
        quantidade: string;
        valorInvestido: string;
    }[]>;
    calculateCurrentAllocation(): Promise<{
        totalPortfolioValue: number;
        totalInvestedValue: number;
        investimentoPorcentagem: number;
    }>;
    calculateRentability(): Promise<{
        message: string;
    }>;
    updateVies(): Promise<{
        message: string;
    }>;
    handleCron(): Promise<void>;
}
