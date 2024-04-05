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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriptoDataController = void 0;
const common_1 = require("@nestjs/common");
const CriptoData_service_1 = require("./CriptoData.service");
let CriptoDataController = class CriptoDataController {
    constructor(criptoDataService) {
        this.criptoDataService = criptoDataService;
    }
    async fetchAndSaveData() {
        return this.criptoDataService.fetchAndSaveCryptocurrencyData();
    }
    async getCriptoData(idCMC) {
        return this.criptoDataService.getCriptoData(idCMC);
    }
    async getAllCriptoData() {
        return this.criptoDataService.getAllCriptoData();
    }
    async getAllNonNullCriptoData() {
        return this.criptoDataService.getAllNonNullCriptoData();
    }
    async calculateCurrentAllocation() {
        return this.criptoDataService.calculateCurrentAllocation();
    }
    async calculateRentability() {
        return this.criptoDataService.calculateRentability();
    }
    async updateVies() {
        return this.criptoDataService.updateVies();
    }
};
exports.CriptoDataController = CriptoDataController;
__decorate([
    (0, common_1.Put)("add-infos"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CriptoDataController.prototype, "fetchAndSaveData", null);
__decorate([
    (0, common_1.Get)('get/:idCMC'),
    __param(0, (0, common_1.Param)('idCMC', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CriptoDataController.prototype, "getCriptoData", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CriptoDataController.prototype, "getAllCriptoData", null);
__decorate([
    (0, common_1.Get)('filtred-cripto'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CriptoDataController.prototype, "getAllNonNullCriptoData", null);
__decorate([
    (0, common_1.Get)('calculate-allocation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CriptoDataController.prototype, "calculateCurrentAllocation", null);
__decorate([
    (0, common_1.Get)('calculate-rentability'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CriptoDataController.prototype, "calculateRentability", null);
__decorate([
    (0, common_1.Patch)('update-vies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CriptoDataController.prototype, "updateVies", null);
exports.CriptoDataController = CriptoDataController = __decorate([
    (0, common_1.Controller)('cripto-data'),
    __metadata("design:paramtypes", [CriptoData_service_1.CriptoDataService])
], CriptoDataController);
//# sourceMappingURL=CriptoData.controller.js.map