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
exports.StudioVideoService = void 0;
const prisma_service_1 = require("../../prisma.service");
const nanoid_1 = require("nanoid");
const common_1 = require("@nestjs/common");
let StudioVideoService = class StudioVideoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(channelId, searchTerm, page = 1, limit = 6) {
        const skip = (page - 1) * limit;
        const whereCondition = this.buildWhereCondition(channelId, searchTerm);
        const videos = await this.getVideos(whereCondition, skip, limit);
        const totalCount = await this.prisma.video.count({
            where: whereCondition
        });
        return {
            videos,
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        };
    }
    async byId(id) {
        const video = await this.getVideoById(id);
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        return video;
    }
    async create(channelId, dto) {
        const video = await this.createVideo(channelId, dto);
        return video.id;
    }
    async update(id, dto) {
        const video = await this.updateVideo(id, dto);
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        return video;
    }
    async delete(id) {
        const video = await this.deleteVideo(id);
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        return video;
    }
    buildWhereCondition(channelId, searchTerm) {
        return {
            channelId,
            ...(searchTerm && {
                OR: [
                    {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                ]
            })
        };
    }
    async getVideos(whereCondition, skip, take) {
        return this.prisma.video.findMany({
            where: whereCondition,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                channel: {
                    include: {
                        user: true
                    }
                },
                tags: true,
                comments: true,
                likes: true
            },
            skip,
            take
        });
    }
    async getVideoById(id) {
        return this.prisma.video.findUnique({
            where: { id },
            include: {
                channel: true,
                tags: true,
                comments: true,
                likes: true
            }
        });
    }
    async createVideo(channelId, dto) {
        const { tags, ...videoData } = dto;
        return this.prisma.video.create({
            data: {
                ...videoData,
                publicId: (0, nanoid_1.nanoid)(10),
                channel: {
                    connect: { id: channelId }
                },
                isPublic: true,
                tags: tags?.length
                    ? {
                        connectOrCreate: tags.map(tag => ({
                            where: { name: tag },
                            create: { name: tag }
                        }))
                    }
                    : undefined
            }
        });
    }
    async updateVideo(id, dto) {
        const { tags, ...videoData } = dto;
        return this.prisma.video.update({
            where: { id },
            data: {
                ...videoData,
                tags: tags?.length
                    ? {
                        set: [],
                        connectOrCreate: tags.map(tag => ({
                            where: { name: tag },
                            create: { name: tag }
                        }))
                    }
                    : {
                        set: []
                    }
            }
        });
    }
    deleteVideo(id) {
        return this.prisma.video.delete({
            where: { id }
        });
    }
};
exports.StudioVideoService = StudioVideoService;
exports.StudioVideoService = StudioVideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudioVideoService);
//# sourceMappingURL=studio-video.service.js.map