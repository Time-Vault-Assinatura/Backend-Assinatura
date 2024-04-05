import { PrismaService } from 'src/Prisma/prisma.service';
export declare class ModelUpdate {
    private prismaService;
    constructor(prismaService: PrismaService);
    UpdateCriptoData(criptoData: {
        idCMC: number;
        name: string;
        price: number;
        marketCap: number;
        volume24h: number;
        percentChange24h: number;
    }): Promise<void>;
    teamUpdateCriptoDetails(criptoDetails: {
        idCMC: number;
        entrada: string;
        alocacao: string;
        vies: string;
    }): Promise<void>;
}
