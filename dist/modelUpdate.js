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
exports.ModelUpdate = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./Prisma/prisma.service");
const client_1 = require("@prisma/client");
let ModelUpdate = class ModelUpdate {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async UpdateCriptoData(criptoData) {
        try {
            await this.prismaService.criptoData.upsert({
                where: {
                    idCMC: criptoData.idCMC,
                },
                update: {
                    ticker: criptoData.name,
                    precoAtual: criptoData.price.toString(),
                },
                create: {
                    idCMC: criptoData.idCMC,
                    ticker: criptoData.name,
                    precoAtual: criptoData.price.toString(),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                console.error("Erro do Prisma:", error.message);
            }
            else {
                console.error("Erro desconhecido:", error);
            }
        }
    }
    async teamUpdateCriptoDetails(criptoDetails) {
        try {
            await this.prismaService.criptoData.update({
                where: {
                    idCMC: criptoDetails.idCMC,
                },
                data: {
                    entrada: criptoDetails.entrada,
                    alocacao: criptoDetails.alocacao,
                    vies: criptoDetails.vies,
                },
            });
        }
        catch (error) {
            console.error("Erro ao atualizar detalhes da criptomoeda:", error);
            throw error;
        }
    }
};
exports.ModelUpdate = ModelUpdate;
exports.ModelUpdate = ModelUpdate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModelUpdate);
//# sourceMappingURL=modelUpdate.js.map