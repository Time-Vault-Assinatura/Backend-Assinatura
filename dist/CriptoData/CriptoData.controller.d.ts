import { CriptoDataService } from './CriptoData.service';
export declare class CriptoDataController {
    private readonly criptoDataService;
    constructor(criptoDataService: CriptoDataService);
    fetchAndSaveData(): Promise<void>;
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
}
