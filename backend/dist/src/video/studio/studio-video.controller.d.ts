import { PaginationQueryDto } from '@/dto/pagination.dto';
import { Channel } from '@prisma/client';
import { CreateVideoDto, UpdateVideoDto } from '../dto/video.dto';
import { StudioVideoService } from './studio-video.service';
export declare class StudioVideoController {
    private readonly studioVideoService;
    constructor(studioVideoService: StudioVideoService);
    getAll(channel: Channel, { limit, page, searchTerm }: PaginationQueryDto): Promise<{
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
    get(id: string): Promise<{
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
    create(channel: Channel, dto: CreateVideoDto): Promise<string>;
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
}
