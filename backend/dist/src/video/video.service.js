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
exports.VideoService = void 0;
const prisma_service_1 = require("../prisma.service");
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let VideoService = class VideoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(searchTerm, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const whereCondition = this.buildWhereCondition(searchTerm);
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
    buildWhereCondition(searchTerm) {
        return {
            isPublic: true,
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
                    },
                    {
                        tags: {
                            some: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    },
                    {
                        channel: {
                            user: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive'
                                }
                            }
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
    async getVideoByPublicId(publicId) {
        const video = await this.findVideoByPublicId(publicId);
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        const similarVideos = await this.getSimilarVideos(video);
        return {
            ...video,
            similarVideos
        };
    }
    async findVideoByPublicId(publicId) {
        return this.prisma.video.findUnique({
            where: { publicId },
            include: {
                channel: {
                    include: {
                        subscribers: true,
                        user: true
                    }
                },
                tags: true,
                likes: true,
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        user: {
                            include: {
                                channel: true
                            }
                        }
                    }
                }
            }
        });
    }
    async getRecommendations(userId, page = 1, limit = 30, excludeIds = []) {
        if (userId) {
            return this.getPersonalizedRecommendations(userId, page, limit, excludeIds);
        }
        else {
            return this.getGeneralRecommendations(page, limit, excludeIds);
        }
    }
    async getPersonalizedRecommendations(userId, page, limit, excludeIds) {
        const skip = (page - 1) * limit;
        const [watchedVideos, likedVideos, subscriptions] = await Promise.all([
            this.prisma.watchHistory.findMany({
                where: { userId },
                select: { videoId: true }
            }),
            this.prisma.videoLike.findMany({
                where: { userId },
                select: { videoId: true }
            }),
            this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    subscriptions: {
                        select: { id: true }
                    }
                }
            })
        ]);
        const interactedVideoIds = [
            ...new Set([
                ...watchedVideos.map(wv => wv.videoId),
                ...likedVideos.map(lv => lv.videoId)
            ])
        ];
        const subscriptionChannelIds = subscriptions?.subscriptions.map(sub => sub.id) || [];
        const [tags, titleWords] = await Promise.all([
            this.prisma.videoTag.findMany({
                where: {
                    videos: {
                        some: {
                            id: { in: interactedVideoIds }
                        }
                    }
                },
                select: { id: true }
            }),
            this.getTitleWordsFromVideos(interactedVideoIds)
        ]);
        const tagIds = tags.map(tag => tag.id);
        let totalCount = await this.prisma.video.count({
            where: {
                isPublic: true,
                id: { notIn: excludeIds },
                OR: [
                    { tags: { some: { id: { in: tagIds } } } },
                    { channelId: { in: subscriptionChannelIds } },
                    ...titleWords.map(word => ({
                        title: { contains: word, mode: client_1.Prisma.QueryMode.insensitive }
                    }))
                ]
            }
        });
        let recommendedVideos = await this.prisma.video.findMany({
            where: {
                isPublic: true,
                id: { notIn: [...interactedVideoIds, ...excludeIds] },
                OR: [
                    {
                        tags: { some: { id: { in: tagIds } } }
                    },
                    {
                        channelId: { in: subscriptionChannelIds }
                    },
                    ...titleWords.map(word => ({
                        title: { contains: word, mode: client_1.Prisma.QueryMode.insensitive }
                    }))
                ]
            },
            include: {
                channel: { include: { user: true } },
                tags: true
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        });
        if (recommendedVideos.length < limit) {
            const additionalLimit = limit - recommendedVideos.length;
            const additionalVideos = await this.getGeneralRecommendations(1, additionalLimit, [...excludeIds, ...recommendedVideos.map(video => video.id)]);
            recommendedVideos = recommendedVideos.concat(additionalVideos.videos);
        }
        return {
            videos: recommendedVideos,
            page,
            limit,
            totalCount,
            totalPages: Math.round(totalCount / limit)
        };
    }
    async getGeneralRecommendations(page, limit, excludeIds = []) {
        const skip = (page - 1) * limit;
        const totalVideoCount = await this.prisma.video.count({
            where: {
                isPublic: true
            }
        });
        const videos = await this.prisma.video.findMany({
            where: {
                isPublic: true,
                id: { notIn: excludeIds }
            },
            include: {
                channel: { include: { user: true } },
                tags: true
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        });
        console.log((await this.prisma.video.findMany({
            where: {
                isPublic: true,
                id: { notIn: excludeIds }
            },
            include: {
                channel: { include: { user: true } },
                tags: true
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        })).length);
        return {
            videos,
            page,
            limit,
            totalCount: totalVideoCount,
            totalPages: Math.round(totalVideoCount / limit)
        };
    }
    async getTitleWordsFromVideos(videoIds) {
        const videos = await this.prisma.video.findMany({
            where: { id: { in: videoIds } },
            select: { title: true }
        });
        const titleWords = videos.flatMap(video => this.extractTitleWords(video.title));
        return Array.from(new Set(titleWords));
    }
    async getSimilarVideos(video) {
        const tagIds = video.tags.map(tag => tag.id);
        const titleWords = this.extractTitleWords(video.title);
        const similarVideos = await this.prisma.video.findMany({
            where: {
                id: {
                    not: video.id
                },
                isPublic: true,
                OR: [
                    {
                        tags: {
                            some: {
                                id: {
                                    in: tagIds
                                }
                            }
                        }
                    },
                    {
                        channelId: video.channelId
                    },
                    ...titleWords.map(word => ({
                        title: {
                            contains: word,
                            mode: client_1.Prisma.QueryMode.insensitive
                        }
                    })),
                    {
                        tags: {
                            some: {
                                name: {
                                    in: titleWords,
                                    mode: client_1.Prisma.QueryMode.insensitive
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                channel: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 6
        });
        return (0, lodash_1.shuffle)(similarVideos);
    }
    extractTitleWords(title) {
        return title
            .toLowerCase()
            .split(' ')
            .map(word => word.trim())
            .filter(word => word.length > 2);
    }
    async byChannel(channelId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const videos = await this.prisma.video.findMany({
            where: {
                channelId,
                isPublic: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                channel: {
                    include: {
                        user: true
                    }
                }
            },
            skip,
            take: limit
        });
        const totalCount = await this.prisma.video.count({
            where: {
                channelId,
                isPublic: true
            }
        });
        return {
            videos,
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        };
    }
    async getTrendingVideos() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const recentVideos = await this.prisma.video.findMany({
            where: {
                isPublic: true,
                createdAt: {
                    gte: oneWeekAgo
                }
            },
            include: {
                tags: true,
                likes: true,
                comments: true,
                channel: {
                    include: {
                        user: true
                    }
                }
            }
        });
        const videosWithScore = recentVideos.map(video => {
            const hoursSincePublished = (new Date().getTime() - video.createdAt.getTime()) / (1000 * 60 * 60);
            const engagementScore = (video.viewsCount * 1 +
                video.likes.length * 2 +
                video.comments.length * 3) /
                Math.pow(hoursSincePublished + 2, 1.5);
            return {
                ...video,
                engagementScore
            };
        });
        videosWithScore.sort((a, b) => b.engagementScore - a.engagementScore);
        let trendingVideos = videosWithScore.slice(0, 6);
        if (trendingVideos.length < 6) {
            const needed = 6 - trendingVideos.length;
            const additionalVideos = await this.prisma.video.findMany({
                where: {
                    isPublic: true,
                    id: {
                        notIn: trendingVideos.map(video => video.id)
                    }
                },
                orderBy: {
                    viewsCount: 'desc'
                },
                include: {
                    tags: true,
                    likes: true,
                    comments: true,
                    channel: {
                        include: {
                            user: true
                        }
                    }
                },
                take: needed
            });
            trendingVideos = trendingVideos.concat(additionalVideos.map(video => ({
                ...video,
                engagementScore: 0
            })));
        }
        return trendingVideos;
    }
    async updateViewsCount(publicId) {
        const video = await this.prisma.video.update({
            where: { publicId },
            data: {
                viewsCount: {
                    increment: 1
                }
            }
        });
        if (!video)
            throw new common_1.NotFoundException('Video not found');
        return video;
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VideoService);
//# sourceMappingURL=video.service.js.map