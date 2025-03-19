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
exports.ChannelService = void 0;
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
let ChannelService = class ChannelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async bySlug(slug) {
        const channel = await this.prisma.channel.findUnique({
            where: { slug },
            include: {
                user: true,
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
                },
                subscribers: true
            }
        });
        if (!channel)
            throw new common_1.NotFoundException('Channel not found');
        return channel;
    }
    async getAll() {
        return this.prisma.channel.findMany();
    }
    async toggleSubscribe(slug, userId) {
        const channel = await this.prisma.channel.findUnique({
            where: { slug },
            select: { id: true }
        });
        if (!channel)
            throw new common_1.NotFoundException('Channel not found');
        const isSubscribed = (await this.prisma.user.count({
            where: {
                id: userId,
                subscriptions: {
                    some: { id: channel.id }
                }
            }
        })) > 0;
        if (isSubscribed) {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    subscriptions: {
                        disconnect: { id: channel.id }
                    }
                }
            });
            return { message: 'Unsubscribed successfully', isSubscribed: false };
        }
        else {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    subscriptions: {
                        connect: { id: channel.id }
                    }
                }
            });
            return { message: 'Subscribed successfully', isSubscribed: true };
        }
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map