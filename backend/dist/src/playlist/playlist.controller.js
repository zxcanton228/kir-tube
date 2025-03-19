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
exports.PlaylistController = void 0;
const common_1 = require("@nestjs/common");
const playlist_service_1 = require("./playlist.service");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const user_decorator_1 = require("../user/decorators/user.decorator");
const create_playlist_dto_1 = require("./dto/create-playlist.dto");
const toggle_video_dto_1 = require("./dto/toggle-video.dto");
let PlaylistController = class PlaylistController {
    constructor(playlistService) {
        this.playlistService = playlistService;
    }
    getUserPlaylists(userId) {
        return this.playlistService.getUserPlaylists(userId);
    }
    getPlaylistById(playlistId) {
        return this.playlistService.getPlaylistById(playlistId);
    }
    toggleVideoInPlaylist(playlistId, toggleVideoDto, userId) {
        const { videoId } = toggleVideoDto;
        return this.playlistService.toggleVideoInPlaylist(playlistId, videoId, userId);
    }
    createPlaylist(createPlaylistDto, userId) {
        return this.playlistService.createPlaylist(userId, createPlaylistDto);
    }
};
exports.PlaylistController = PlaylistController;
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "getUserPlaylists", null);
__decorate([
    (0, common_1.Get)(':playlistId'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('playlistId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "getPlaylistById", null);
__decorate([
    (0, common_1.Post)(':playlistId/toggle-video'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('playlistId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, toggle_video_dto_1.ToggleVideoDto, String]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "toggleVideoInPlaylist", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_playlist_dto_1.CreatePlaylistDto, String]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "createPlaylist", null);
exports.PlaylistController = PlaylistController = __decorate([
    (0, common_1.Controller)('playlists'),
    __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
], PlaylistController);
//# sourceMappingURL=playlist.controller.js.map