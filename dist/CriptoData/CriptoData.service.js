"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriptoDataService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("@nestjs/axios");
const prisma_service_1 = require("../Prisma/prisma.service");
const modelCreate_1 = require("../modelCreate");
const rxjs_1 = require("rxjs");
const modelUpdate_1 = require("../modelUpdate");
const modelGet_1 = require("../modelGet");
let CriptoDataService = class CriptoDataService {
    constructor(httpService, prismaService, modelCreate, modelUpdate, modelGet) {
        this.httpService = httpService;
        this.prismaService = prismaService;
        this.modelCreate = modelCreate;
        this.modelUpdate = modelUpdate;
        this.modelGet = modelGet;
    }
    async fetchAndSaveCryptocurrencyData() {
        const criptoDatas = await this.prismaService.criptoData.findMany({
            select: { idCMC: true }
        });
        const ids = criptoDatas.map(data => data.idCMC.toString());
        const convert = 'USD';
        const baseUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
        const apiKey = process.env.CMC_API_KEY;
        const queryString = `?id=${ids.join(',')}&convert=${convert}`;
        const options = {
            headers: { 'X-CMC_PRO_API_KEY': apiKey },
        };
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(baseUrl + queryString, options));
            const data = response.data;
            const values = ids.map(id => {
                if (data.data && data.data[id]) {
                    const coinData = data.data[id];
                    return {
                        idCMC: coinData.id,
                        name: coinData.symbol,
                        price: coinData.quote[convert].price,
                        marketCap: coinData.quote[convert].market_cap,
                        volume24h: coinData.quote[convert].volume_24h,
                        percentChange24h: coinData.quote[convert].percent_change_24h,
                    };
                }
                else {
                    return null;
                }
            }).filter(v => v !== null);
            for (const value of values) {
                await this.modelUpdate.UpdateCriptoData(value);
            }
        }
        catch (error) {
            console.error('Error fetching cryptocurrency data:', error);
        }
    }
    async getCriptoData(idCMC) {
        if (!Number.isInteger(idCMC) || idCMC <= 0) {
            throw new Error('O ID fornecido é inválido. Deve ser um número inteiro positivo.');
        }
        const criptoData = await this.modelGet.getCriptoData(idCMC);
        if (!criptoData) {
            throw new Error(`Nenhum dado encontrado para o ID ${idCMC}.`);
        }
        return criptoData;
    }
    async getAllCriptoData() {
        const allCriptoData = await this.modelGet.getAllCriptoData();
        if (allCriptoData.length === 0) {
            throw new Error('Nenhum dado de criptomoeda encontrado.');
        }
        return allCriptoData;
    }
    async getAllNonNullCriptoData() {
        const allCriptoDataFiltred = await this.modelGet.getAllCriptoDataFiltred();
        if (allCriptoDataFiltred.length === 0) {
            throw new Error('Nenhum dado de criptomoeda encontrado sem campos nulos.');
        }
        return allCriptoDataFiltred;
    }
    async calculateCurrentAllocation() {
        let totalInvestedValue = 0;
        const criptoDatas = await this.prismaService.criptoData.findMany({
            where: {
                precoAtual: { not: null },
                quantidade: { not: null }
            }
        });
        for (let cripto of criptoDatas) {
            const precoAtual = parseFloat(cripto.precoAtual);
            const quantidade = parseFloat(cripto.quantidade);
            const valorInvestido = quantidade * precoAtual;
            totalInvestedValue += valorInvestido;
            await this.prismaService.criptoData.update({
                where: { id: cripto.id },
                data: { valorInvestido: String(valorInvestido) }
            });
        }
        const totalPortfolioValue = totalInvestedValue;
        for (let cripto of criptoDatas) {
            const valorInvestido = parseFloat(cripto.valorInvestido);
            const alocacaoAtual = valorInvestido / totalPortfolioValue * 100;
            await this.prismaService.criptoData.update({
                where: { id: cripto.id },
                data: { alocacaoAtual: String(alocacaoAtual) }
            });
        }
        return {
            totalPortfolioValue,
            totalInvestedValue: totalPortfolioValue,
            investimentoPorcentagem: 100
        };
    }
    async calculateRentability() {
        const criptoDatas = await this.prismaService.criptoData.findMany({
            where: {
                precoAtual: { not: null },
                entrada: { not: null }
            }
        });
        for (let cripto of criptoDatas) {
            const precoAtual = parseFloat(cripto.precoAtual);
            const entrada = parseFloat(cripto.entrada);
            const rentabilidade = ((precoAtual - entrada) / entrada) * 100;
            await this.prismaService.criptoData.update({
                where: { id: cripto.id },
                data: { rentabilidade: String(rentabilidade) }
            });
        }
        return { message: "Rentabilidade calculada e atualizada com sucesso." };
    }
    async updateVies() {
        const criptoDatas = await this.prismaService.criptoData.findMany({
            where: {
                alocacao: { not: null },
                alocacaoAtual: { not: null }
            }
        });
        for (let cripto of criptoDatas) {
            const alocacao = parseFloat(cripto.alocacao);
            const alocacaoAtual = parseFloat(cripto.alocacaoAtual);
            let vies;
            if (alocacaoAtual > alocacao) {
                vies = 'realocar vendendo';
            }
            else if (alocacaoAtual < alocacao) {
                vies = 'realocar comprando';
            }
            else {
                vies = 'manter';
            }
            await this.prismaService.criptoData.update({
                where: { id: cripto.id },
                data: { vies }
            });
        }
        return { message: "Viés atualizado com sucesso." };
    }
    async handleCron() {
        await this.fetchAndSaveCryptocurrencyData();
        await this.updateVies();
        await this.calculateRentability();
        await this.calculateCurrentAllocation();
    }
};
exports.CriptoDataService = CriptoDataService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_10_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CriptoDataService.prototype, "handleCron", null);
exports.CriptoDataService = CriptoDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService,
        modelCreate_1.ModelCreate,
        modelUpdate_1.ModelUpdate,
        modelGet_1.ModelGet])
], CriptoDataService);
//# sourceMappingURL=CriptoData.service.js.map