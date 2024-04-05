import { PrismaService } from 'src/Prisma/prisma.service';
export declare class ModelGet {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    getAllCriptoDataFiltred(): Promise<{
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
}
