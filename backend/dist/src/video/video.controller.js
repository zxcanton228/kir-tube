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
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../dto/pagination.dto");
const video_service_1 = require("./video.service");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async getVideoByPublicId(publicId) {
        return this.videoService.getVideoByPublicId(publicId);
    }
    async byChannel(channelId, paginationQuery) {
        const { page, limit } = paginationQuery;
        return this.videoService.byChannel(channelId, page, limit);
    }
    async getAll(paginationQuery) {
        const { page, limit, searchTerm } = paginationQuery;
        return this.videoService.getAll(searchTerm, page, limit);
    }
    async getVideoGames() {
        return this.videoService.getAll('game');
    }
    async getTrending() {
        return this.videoService.getTrendingVideos();
    }
    async getExplore(paginationQuery, userId, excludeIds) {
        const excludeIdArray = excludeIds ? excludeIds.split(',') : [];
        const { page, limit } = paginationQuery;
        return this.videoService.getRecommendations(userId, page, limit, excludeIdArray);
    }
    async updateViewsCount(publicId) {
        return this.videoService.updateViewsCount(publicId);
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, common_1.Get)('by-publicId/:publicId'),
    __param(0, (0, common_1.Param)('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoByPublicId", null);
__decorate([
    (0, common_1.Get)('by-channel/:channelId'),
    __param(0, (0, common_1.Param)('channelId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "byChannel", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('games'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoGames", null);
__decorate([
    (0, common_1.Get)('trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getTrending", null);
__decorate([
    (0, common_1.Get)('explore'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('userId')),
    __param(2, (0, common_1.Query)('excludeIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationQueryDto, String, String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getExplore", null);
__decorate([
    (0, common_1.Put)('update-views-count/:publicId'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "updateViewsCount", null);
exports.VideoController = VideoController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
//# sourceMappingURL=video.controller.js.map