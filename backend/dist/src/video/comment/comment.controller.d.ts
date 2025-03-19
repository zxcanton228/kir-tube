import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(dto: CreateCommentDto, req: any): Promise<{
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
    updateComment(commentId: string, dto: UpdateCommentDto, req: any): Promise<{
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
    deleteComment(commentId: string, req: any): Promise<{
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
