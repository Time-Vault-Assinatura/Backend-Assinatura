import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { TeamEditCriptoDataService } from './TeamEditCriptoData.service';

@Controller('edit-cripto-data')
export class TeamEditCriptoDataController {
    constructor(private readonly teamEditCriptoDataService: TeamEditCriptoDataService) { }


    @Post('add-ids')
    async addCriptoDataIds(@Body() body: { idsCMC: number[] }) {
        return this.teamEditCriptoDataService.addCriptoDataIds(body.idsCMC);
    }

    @Delete('delete/:idCMC')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteCriptoData(@Param('idCMC', ParseIntPipe) idCMC: number) {
        await this.teamEditCriptoDataService.deleteCriptoData(idCMC);
    }

    @Patch('update-details/:idCMC')
    async updateCriptoDetails(
        @Param('idCMC', ParseIntPipe) idCMC: number,
        @Body() body: { entrada?: string; alocacao?: string; vies?: string; quantidade?: string; }
    ) {
        return this.teamEditCriptoDataService.teamUpdateCriptoDetails({ idCMC, ...body });
    }

}