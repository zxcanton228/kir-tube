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
exports.CommentService = void 0;
const prisma_service_1 = require("../../prisma.service");
const common_1 = require("@nestjs/common");
let CommentService = class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createComment(userId, dto) {
        const { text, videoId } = dto;
        const video = await this.prisma.video.findUnique({
            where: { id: videoId }
        });
        if (!video) {
            throw new common_1.NotFoundException('Видео не найдено');
        }
        const comment = await this.prisma.videoComment.create({
            data: {
                text,
                userId,
                videoId
            },
            include: {
                user: true
            }
        });
        return comment;
    }
    async updateComment(commentId, userId, dto) {
        const comment = await this.prisma.videoComment.findUnique({
            where: { id: commentId }
        });
        if (!comment) {
            throw new common_1.NotFoundException('Комментарий не найден');
        }
        if (comment.userId !== userId) {
            throw new common_1.ForbiddenException('Вы не можете редактировать этот комментарий');
        }
        const updatedComment = await this.prisma.videoComment.update({
            where: { id: commentId },
            data: {
                text: dto.text
            },
            include: {
                user: true
            }
        });
        return updatedComment;
    }
    async deleteComment(commentId, userId) {
        const comment = await this.prisma.videoComment.findUnique({
            where: { id: commentId }
        });
        if (!comment) {
            throw new common_1.NotFoundException('Комментарий не найден');
        }
        if (comment.userId !== userId) {
            throw new common_1.ForbiddenException('Вы не можете удалить этот комментарий');
        }
        await this.prisma.videoComment.delete({
            where: { id: commentId }
        });
        return { message: 'Комментарий удален' };
    }
    async getCommentsByPublicId(publicId) {
        const comments = await this.prisma.videoComment.findMany({
            where: {
                video: {
                    publicId
                }
            },
            include: {
                user: {
                    include: {
                        channel: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return comments;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map