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
exports.TeamEditCriptoDataController = void 0;
const common_1 = require("@nestjs/common");
const TeamEditCriptoData_service_1 = require("./TeamEditCriptoData.service");
let TeamEditCriptoDataController = class TeamEditCriptoDataController {
    constructor(teamEditCriptoDataService) {
        this.teamEditCriptoDataService = teamEditCriptoDataService;
    }
    async addCriptoDataIds(body) {
        return this.teamEditCriptoDataService.addCriptoDataIds(body.idsCMC);
    }
    async deleteCriptoData(idCMC) {
        await this.teamEditCriptoDataService.deleteCriptoData(idCMC);
    }
    async updateCriptoDetails(idCMC, body) {
        return this.teamEditCriptoDataService.teamUpdateCriptoDetails({ idCMC, ...body });
    }
};
exports.TeamEditCriptoDataController = TeamEditCriptoDataController;
__decorate([
    (0, common_1.Post)('add-ids'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TeamEditCriptoDataController.prototype, "addCriptoDataIds", null);
__decorate([
    (0, common_1.Delete)('delete/:idCMC'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('idCMC', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamEditCriptoDataController.prototype, "deleteCriptoData", null);
__decorate([
    (0, common_1.Patch)('update-details/:idCMC'),
    __param(0, (0, common_1.Param)('idCMC', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TeamEditCriptoDataController.prototype, "updateCriptoDetails", null);
exports.TeamEditCriptoDataController = TeamEditCriptoDataController = __decorate([
    (0, common_1.Controller)('edit-cripto-data'),
    __metadata("design:paramtypes", [TeamEditCriptoData_service_1.TeamEditCriptoDataService])
], TeamEditCriptoDataController);
//# sourceMappingURL=TeamEditCriptoData.controller.js.map