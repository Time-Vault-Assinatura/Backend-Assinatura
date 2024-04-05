"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamEditCriptoDataModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const modelCreate_1 = require("../modelCreate");
const prisma_service_1 = require("../Prisma/prisma.service");
const modelUpdate_1 = require("../modelUpdate");
const modelDelete_1 = require("../modelDelete");
const modelGet_1 = require("../modelGet");
const TeamEditCriptoData_service_1 = require("./TeamEditCriptoData.service");
const TeamEditCriptoData_controller_1 = require("./TeamEditCriptoData.controller");
const CriptoData_service_1 = require("../CriptoData/CriptoData.service");
let TeamEditCriptoDataModule = class TeamEditCriptoDataModule {
};
exports.TeamEditCriptoDataModule = TeamEditCriptoDataModule;
exports.TeamEditCriptoDataModule = TeamEditCriptoDataModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [TeamEditCriptoData_service_1.TeamEditCriptoDataService, modelCreate_1.ModelCreate, modelUpdate_1.ModelUpdate, modelDelete_1.ModelDelete, modelGet_1.ModelGet, prisma_service_1.PrismaService, CriptoData_service_1.CriptoDataService],
        controllers: [TeamEditCriptoData_controller_1.TeamEditCriptoDataController]
    })
], TeamEditCriptoDataModule);
//# sourceMappingURL=TeamEditCriptoData.module.js.map