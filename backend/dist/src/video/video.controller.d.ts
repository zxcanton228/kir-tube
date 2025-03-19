import { PaginationQueryDto } from '@/dto/pagination.dto';
import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getVideoByPublicId(publicId: string): Promise<{
        similarVideos: ({
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
            subscribers: {
                name: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                verificationToken: string | null;
            }[];
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
        comments: ({
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
        })[];
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
    byChannel(channelId: string, paginationQuery: PaginationQueryDto): Promise<{
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
    getAll(paginationQuery: PaginationQueryDto): Promise<{
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
    getVideoGames(): Promise<{
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
    getTrending(): Promise<{
        engagementScore: number;
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
    }[]>;
    getExplore(paginationQuery: PaginationQueryDto, userId?: string, excludeIds?: string): Promise<{
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
    updateViewsCount(publicId: string): Promise<{
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
