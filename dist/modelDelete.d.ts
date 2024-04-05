import { PrismaService } from 'src/Prisma/prisma.service';
export declare class ModelDelete {
    private prismaService;
    constructor(prismaService: PrismaService);
    deleteCripto(idCMC: number): Promise<{
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
}
