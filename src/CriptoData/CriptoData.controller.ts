import { Body, Controller, Get, Post, Put, Delete, Param, ParseIntPipe, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { CriptoDataService } from './CriptoData.service';

@Controller('cripto-data')
export class CriptoDataController {
    constructor(private readonly criptoDataService: CriptoDataService) { }

    @Put("add-infos")
    async fetchAndSaveData() {
        return this.criptoDataService.fetchAndSaveCryptocurrencyData();
    }

    @Get('get/:idCMC')
    async getCriptoData(@Param('idCMC', ParseIntPipe) idCMC: number) {
        return this.criptoDataService.getCriptoData(idCMC);
    }

    @Get('getAll')
    async getAllCriptoData() {
        return this.criptoDataService.getAllCriptoData();
    }

    @Get('filtred-cripto')
    async getAllNonNullCriptoData() {
        return this.criptoDataService.getAllNonNullCriptoData();
    }

    @Get('calculate-allocation')
    async calculateCurrentAllocation() {
        return this.criptoDataService.calculateCurrentAllocation();
    }

    @Get('calculate-rentability')
    async calculateRentability() {
        return this.criptoDataService.calculateRentability();
    }

    @Patch('update-vies')
    async updateVies() {
        return this.criptoDataService.updateVies();
    }

}
