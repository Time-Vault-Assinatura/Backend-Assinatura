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
exports.ModelCreate = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./Prisma/prisma.service");
const client_1 = require("@prisma/client");
let ModelCreate = class ModelCreate {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createCriptoData(criptoData) {
        try {
            await this.prismaService.criptoData.create({
                data: {
                    idCMC: criptoData.idCMC,
                    ticker: criptoData.name,
                    precoAtual: criptoData.price.toString(),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log(`Um registro com idCMC ${criptoData.idCMC} já existe.`);
                }
                else {
                    console.log("Ocorreu um erro:", error);
                }
            }
            else {
                console.error("Erro desconhecido:", error);
            }
        }
    }
    async addCriptoDataIds(idsCMC) {
        try {
            const dataToInsert = idsCMC.map(idCMC => ({
                idCMC,
            }));
            const result = await this.prismaService.criptoData.createMany({
                data: dataToInsert,
                skipDuplicates: true,
            });
            return { count: result.count };
        }
        catch (error) {
            console.error('Erro ao adicionar idsCMC:', error);
            throw error;
        }
    }
};
exports.ModelCreate = ModelCreate;
exports.ModelCreate = ModelCreate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModelCreate);
//# sourceMappingURL=modelCreate.js.map