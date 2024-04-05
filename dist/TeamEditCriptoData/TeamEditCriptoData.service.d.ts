import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/Prisma/prisma.service';
import { ModelCreate } from 'src/modelCreate';
import { ModelUpdate } from 'src/modelUpdate';
import { ModelDelete } from 'src/modelDelete';
import { ModelGet } from 'src/modelGet';
import { CriptoDataService } from 'src/CriptoData/CriptoData.service';
export declare class TeamEditCriptoDataService {
    private httpService;
    private prismaService;
    private modelCreate;
    private modelUpdate;
    private modelDelete;
    private modelGet;
    private criptoDataService;
    constructor(httpService: HttpService, prismaService: PrismaService, modelCreate: ModelCreate, modelUpdate: ModelUpdate, modelDelete: ModelDelete, modelGet: ModelGet, criptoDataService: CriptoDataService);
    addCriptoDataIds(idsCMC: number[]): Promise<{
        message: string;
    }>;
    deleteCriptoData(idCMC: number): Promise<{
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
    teamUpdateCriptoDetails(criptoDetails: {
        idCMC: number;
        entrada?: string;
        alocacao?: string;
        vies?: string;
        quantidade?: string;
    }): Promise<void>;
}
