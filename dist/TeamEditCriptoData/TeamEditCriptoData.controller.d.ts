import { TeamEditCriptoDataService } from './TeamEditCriptoData.service';
export declare class TeamEditCriptoDataController {
    private readonly teamEditCriptoDataService;
    constructor(teamEditCriptoDataService: TeamEditCriptoDataService);
    addCriptoDataIds(body: {
        idsCMC: number[];
    }): Promise<{
        message: string;
    }>;
    deleteCriptoData(idCMC: number): Promise<void>;
    updateCriptoDetails(idCMC: number, body: {
        entrada?: string;
        alocacao?: string;
        vies?: string;
        quantidade?: string;
    }): Promise<void>;
}
