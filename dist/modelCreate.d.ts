import { PrismaService } from 'src/Prisma/prisma.service';
export declare class ModelCreate {
    private prismaService;
    constructor(prismaService: PrismaService);
    createCriptoData(criptoData: {
        idCMC: number;
        name: string;
        price: number;
        marketCap: number;
        volume24h: number;
        percentChange24h: number;
    }): Promise<void>;
    addCriptoDataIds(idsCMC: number[]): Promise<{
        count: number;
    }>;
}
