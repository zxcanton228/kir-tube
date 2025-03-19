import { PrismaService } from '@/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateVideoDto, UpdateVideoDto } from '../dto/video.dto';
export declare class StudioVideoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(channelId: string, searchTerm?: string, page?: number, limit?: number): Promise<{
        videos: ({
            channel: {
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
                slug: string;
                description: string | null;
                isVerified: boolean;
                avatarUrl: string | null;
                bannerUrl: string | null;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            };
            comments: {
                id: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
                text: string;
                videoId: string;
            }[];
            likes: {
                id: string;
                userId: string;
                createdAt: Date;
                videoId: string;
            }[];
            tags: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: string;
            description: string;
            createdAt: Date;
            updatedAt: Date;
            publicId: string;
            title: string;
            thumbnailUrl: string;
            videoFileName: string;
            maxResolution: string;
            viewsCount: number;
            isPublic: boolean;
            channelId: string;
        })[];
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
    }>;
    byId(id: string): Promise<{
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
        comments: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            text: string;
            videoId: string;
        }[];
        likes: {
            id: string;
            userId: string;
            createdAt: Date;
            videoId: string;
        }[];
        tags: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        publicId: string;
        title: string;
        thumbnailUrl: string;
        videoFileName: string;
        maxResolution: string;
        viewsCount: number;
        isPublic: boolean;
        channelId: string;
    }>;
    create(channelId: string, dto: CreateVideoDto): Promise<string>;
    update(id: string, dto: UpdateVideoDto): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        publicId: string;
        title: string;
        thumbnailUrl: string;
        videoFileName: string;
        maxResolution: string;
        viewsCount: number;
        isPublic: boolean;
        channelId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        publicId: string;
        title: string;
        thumbnailUrl: string;
        videoFileName: string;
        maxResolution: string;
        viewsCount: number;
        isPublic: boolean;
        channelId: string;
    }>;
    private buildWhereCondition;
    private getVideos;
    getVideoById(id: string): Promise<{
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
        comments: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            text: string;
            videoId: string;
        }[];
        likes: {
            id: string;
            userId: string;
            createdAt: Date;
            videoId: string;
        }[];
        tags: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        publicId: string;
        title: string;
        thumbnailUrl: string;
        videoFileName: string;
        maxResolution: string;
        viewsCount: number;
        isPublic: boolean;
        channelId: string;
    }>;
    private createVideo;
    private updateVideo;
    deleteVideo(id: string): Prisma.Prisma__VideoClient<{
        id: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;
        publicId: string;
        title: string;
        thumbnailUrl: string;
        videoFileName: string;
        maxResolution: string;
        viewsCount: number;
        isPublic: boolean;
        channelId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
