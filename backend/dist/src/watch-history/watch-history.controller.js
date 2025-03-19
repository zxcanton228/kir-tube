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
exports.WatchHistoryController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../user/decorators/user.decorator");
const watch_history_service_1 = require("./watch-history.service");
let WatchHistoryController = class WatchHistoryController {
    constructor(watchHistoryService) {
        this.watchHistoryService = watchHistoryService;
    }
    async getUserHistory(userId) {
        return this.watchHistoryService.getByUserId(userId);
    }
    async addToHistory(userId, videoId) {
        return this.watchHistoryService.addToHistory(userId, videoId);
    }
    async clearHistory(userId) {
        return this.watchHistoryService.clearHistory(userId);
    }
};
exports.WatchHistoryController = WatchHistoryController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WatchHistoryController.prototype, "getUserHistory", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)('videoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WatchHistoryController.prototype, "addToHistory", null);
__decorate([
    (0, common_1.Delete)(),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WatchHistoryController.prototype, "clearHistory", null);
exports.WatchHistoryController = WatchHistoryController = __decorate([
    (0, common_1.Controller)('watch-history'),
    __metadata("design:paramtypes", [watch_history_service_1.WatchHistoryService])
], WatchHistoryController);
//# sourceMappingURL=watch-history.controller.js.map