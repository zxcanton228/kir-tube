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
exports.UserService = void 0;
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
const argon2_1 = require("argon2");
const lodash_1 = require("lodash");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async byId(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                likes: {
                    include: {
                        video: {
                            include: {
                                channel: {
                                    include: {
                                        user: true
                                    }
                                }
                            }
                        }
                    }
                },
                channel: true,
                subscriptions: true
            }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return (0, lodash_1.omit)(user, ['password']);
    }
    async getProfile(id) {
        const user = await this.byId(id);
        const subscribedVideos = await this.prisma.video.findMany({
            where: {
                channel: {
                    subscribers: {
                        some: {
                            id: id
                        }
                    }
                }
            },
            include: {
                channel: {
                    include: {
                        user: true
                    }
                },
                likes: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return {
            ...user,
            subscribedVideos
        };
    }
    async updateProfile(id, { channel, password, ...dto }) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isSameUser = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (isSameUser && String(id) !== String(isSameUser.id))
            throw new common_1.NotFoundException('Email busy');
        if (password) {
            const hashPassword = await (0, argon2_1.hash)(password);
            user.password = hashPassword;
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                password: user.password,
                ...dto,
                channel: {
                    upsert: {
                        create: channel,
                        update: channel
                    }
                }
            }
        });
    }
    async getCount() {
        return this.prisma.user.count();
    }
    async getAll(searchTerm) {
        return this.prisma.user.findMany({
            where: searchTerm
                ? {
                    email: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                }
                : {},
            select: {
                email: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async delete(id) {
        return this.prisma.user.delete({
            where: { id }
        });
    }
    async toggleLike(videoId, userId) {
        const videoExists = await this.prisma.video.findUnique({
            where: { id: videoId }
        });
        if (!videoExists) {
            throw new Error('Видео не найдено');
        }
        const isLiked = await this.prisma.videoLike.findFirst({
            where: {
                userId: userId,
                videoId: videoId
            }
        });
        if (isLiked) {
            return this.prisma.videoLike.delete({
                where: {
                    id: isLiked.id
                }
            });
        }
        return this.prisma.videoLike.create({
            data: {
                userId: userId,
                videoId: videoId
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map