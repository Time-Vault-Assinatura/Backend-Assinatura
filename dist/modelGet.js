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
exports.ModelGet = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./Prisma/prisma.service");
let ModelGet = class ModelGet {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getCriptoData(idCMC) {
        try {
            const criptoData = await this.prismaService.criptoData.findUnique({
                where: { idCMC },
            });
            return criptoData;
        }
        catch (error) {
            console.error("Erro ao buscar dados da criptomoeda:", error);
            throw error;
        }
    }
    async getAllCriptoData() {
        try {
            const allCriptoData = await this.prismaService.criptoData.findMany();
            return allCriptoData;
        }
        catch (error) {
            console.error("Erro ao buscar todos os dados de criptomoedas:", error);
            throw error;
        }
    }
    async getAllCriptoDataFiltred() {
        try {
            const allCriptoData = await this.prismaService.criptoData.findMany({
                where: {
                    idCMC: { not: null },
                    ticker: { not: null },
                    precoAtual: { not: null },
                    alocacao: { not: null },
                    alocacaoAtual: { not: null },
                    rentabilidade: { not: null },
                    vies: { not: null },
                }
            });
            return allCriptoData;
        }
        catch (error) {
            console.error("Erro ao buscar dados de criptomoedas sem campos nulos:", error);
            throw error;
        }
    }
};
exports.ModelGet = ModelGet;
exports.ModelGet = ModelGet = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModelGet);
//# sourceMappingURL=modelGet.js.map