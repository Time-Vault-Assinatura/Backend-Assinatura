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
exports.ModelDelete = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./Prisma/prisma.service");
const client_1 = require("@prisma/client");
let ModelDelete = class ModelDelete {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async deleteCripto(idCMC) {
        try {
            return await this.prismaService.criptoData.delete({
                where: { idCMC },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new Error('Registro não encontrado.');
                }
                throw new Error('Erro do Prisma ao deletar o registro.');
            }
            else {
                throw new Error('Erro desconhecido ao deletar o registro.');
            }
        }
    }
};
exports.ModelDelete = ModelDelete;
exports.ModelDelete = ModelDelete = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModelDelete);
//# sourceMappingURL=modelDelete.js.map