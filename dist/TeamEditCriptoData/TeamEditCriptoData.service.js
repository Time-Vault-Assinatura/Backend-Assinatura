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
exports.TeamEditCriptoDataService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const prisma_service_1 = require("../Prisma/prisma.service");
const modelCreate_1 = require("../modelCreate");
const client_1 = require("@prisma/client");
const modelUpdate_1 = require("../modelUpdate");
const modelDelete_1 = require("../modelDelete");
const modelGet_1 = require("../modelGet");
const CriptoData_service_1 = require("../CriptoData/CriptoData.service");
let TeamEditCriptoDataService = class TeamEditCriptoDataService {
    constructor(httpService, prismaService, modelCreate, modelUpdate, modelDelete, modelGet, criptoDataService) {
        this.httpService = httpService;
        this.prismaService = prismaService;
        this.modelCreate = modelCreate;
        this.modelUpdate = modelUpdate;
        this.modelDelete = modelDelete;
        this.modelGet = modelGet;
        this.criptoDataService = criptoDataService;
    }
    async addCriptoDataIds(idsCMC) {
        if (!idsCMC.every(id => Number.isInteger(id) && id > 0)) {
            throw new Error('Todos os idsCMC devem ser inteiros positivos.');
        }
        try {
            const result = await this.modelCreate.addCriptoDataIds(idsCMC);
            await this.criptoDataService.fetchAndSaveCryptocurrencyData();
            return {
                message: `${result.count} novo(s) idCMC(s) adicionado(s).`,
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        return { message: 'Alguns idsCMC estavam duplicados e foram ignorados.' };
                    default:
                        console.error('Erro do Prisma:', error);
                        throw new Error('Erro ao adicionar idsCMC ao banco de dados.');
                }
            }
            else {
                console.error('Erro desconhecido:', error);
                throw new Error('Um erro desconhecido ocorreu.');
            }
        }
    }
    async deleteCriptoData(idCMC) {
        if (!Number.isInteger(idCMC) || idCMC <= 0) {
            throw new Error('O ID fornecido é inválido. Deve ser um número inteiro positivo.');
        }
        const criptoData = await this.modelGet.getCriptoData(idCMC);
        if (!criptoData) {
            throw new Error(`Nenhum dado encontrado para o ID ${idCMC}.`);
        }
        return this.modelDelete.deleteCripto(idCMC);
    }
    async teamUpdateCriptoDetails(criptoDetails) {
        const updateData = {};
        if (criptoDetails.entrada !== undefined) {
            updateData['entrada'] = criptoDetails.entrada;
        }
        if (criptoDetails.alocacao !== undefined) {
            updateData['alocacao'] = criptoDetails.alocacao;
        }
        if (criptoDetails.vies !== undefined) {
            updateData['vies'] = criptoDetails.vies;
        }
        if (criptoDetails.quantidade !== undefined) {
            updateData['quantidade'] = criptoDetails.quantidade;
        }
        try {
            await this.prismaService.criptoData.update({
                where: { idCMC: criptoDetails.idCMC },
                data: updateData,
            });
        }
        catch (error) {
            console.error("Erro ao atualizar detalhes da criptomoeda:", error);
            throw error;
        }
    }
};
exports.TeamEditCriptoDataService = TeamEditCriptoDataService;
exports.TeamEditCriptoDataService = TeamEditCriptoDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService,
        modelCreate_1.ModelCreate,
        modelUpdate_1.ModelUpdate,
        modelDelete_1.ModelDelete,
        modelGet_1.ModelGet,
        CriptoData_service_1.CriptoDataService])
], TeamEditCriptoDataService);
//# sourceMappingURL=TeamEditCriptoData.service.js.map