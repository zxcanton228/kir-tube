import { PrismaService } from '@/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createComment(userId: string, dto: CreateCommentDto): Promise<{
        user: {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        videoId: string;
    }>;
    updateComment(commentId: string, userId: string, dto: UpdateCommentDto): Promise<{
        user: {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        videoId: string;
    }>;
    deleteComment(commentId: string, userId: string): Promise<{
        message: string;
    }>;
    getCommentsByPublicId(publicId: string): Promise<({
        user: {
            channel: {
                id: string;
                slug: string;
                description: string | null;
                isVerified: boolean;
                avatarUrl: string | null;
                bannerUrl: string | null;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        };
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        text: string;
        videoId: string;
    })[]>;
}
