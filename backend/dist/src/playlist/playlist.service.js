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
exports.PlaylistService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PlaylistService = class PlaylistService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlaylistById(playlistId) {
        const playlist = await this.prisma.playlist.findUnique({
            where: { id: playlistId },
            include: {
                videos: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        channel: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        if (!playlist) {
            throw new common_1.NotFoundException('Плейлист не найден');
        }
        return playlist;
    }
    async getUserPlaylists(userId) {
        const playlists = await this.prisma.playlist.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                videos: true
            }
        });
        return playlists;
    }
    async toggleVideoInPlaylist(playlistId, videoId, userId) {
        const playlist = await this.prisma.playlist.findFirst({
            where: {
                id: playlistId,
                userId
            },
            include: {
                videos: true
            }
        });
        if (!playlist) {
            throw new common_1.NotFoundException('Плейлист не найден или недоступен');
        }
        const videoExists = await this.prisma.video.findUnique({
            where: { id: videoId }
        });
        if (!videoExists) {
            throw new common_1.NotFoundException('Видео не найдено');
        }
        const isVideoInPlaylist = playlist.videos.some(video => video.id === videoId);
        if (isVideoInPlaylist) {
            await this.prisma.playlist.update({
                where: { id: playlistId },
                data: {
                    videos: {
                        disconnect: { id: videoId }
                    }
                }
            });
            return { message: 'Видео удалено из плейлиста' };
        }
        else {
            await this.prisma.playlist.update({
                where: { id: playlistId },
                data: {
                    videos: {
                        connect: { id: videoId }
                    }
                }
            });
            return { message: 'Видео добавлено в плейлист' };
        }
    }
    async createPlaylist(userId, createPlaylistDto) {
        const { title, videoPublicId } = createPlaylistDto;
        let video = null;
        if (videoPublicId) {
            video = await this.prisma.video.findUnique({
                where: { publicId: videoPublicId }
            });
            if (!video) {
                throw new common_1.NotFoundException('Видео не найдено');
            }
        }
        const playlist = await this.prisma.playlist.create({
            data: {
                title,
                userId,
                videos: video
                    ? {
                        connect: { publicId: videoPublicId }
                    }
                    : undefined
            },
            include: {
                videos: true
            }
        });
        return playlist;
    }
};
exports.PlaylistService = PlaylistService;
exports.PlaylistService = PlaylistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlaylistService);
//# sourceMappingURL=playlist.service.js.map