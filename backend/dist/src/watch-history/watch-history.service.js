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
exports.WatchHistoryService = void 0;
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
let WatchHistoryService = class WatchHistoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getByUserId(userId) {
        return this.prisma.watchHistory.findMany({
            where: { userId },
            orderBy: {
                watchedAt: 'desc'
            },
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
        });
    }
    async addToHistory(userId, videoId) {
        return this.prisma.watchHistory.upsert({
            where: {
                userId_videoId: {
                    userId,
                    videoId
                }
            },
            update: {
                watchedAt: new Date()
            },
            create: {
                userId,
                videoId,
                watchedAt: new Date()
            }
        });
    }
    async clearHistory(userId) {
        return this.prisma.watchHistory.deleteMany({
            where: { userId }
        });
    }
};
exports.WatchHistoryService = WatchHistoryService;
exports.WatchHistoryService = WatchHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WatchHistoryService);
//# sourceMappingURL=watch-history.service.js.map