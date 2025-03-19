import { PrismaService } from '@/prisma.service';
export declare class VideoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAll(searchTerm?: string, page?: number, limit?: number): Promise<{
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
    private buildWhereCondition;
    private getVideos;
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
    private findVideoByPublicId;
    getRecommendations(userId?: string, page?: number, limit?: number, excludeIds?: string[]): Promise<{
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
    private getPersonalizedRecommendations;
    private getGeneralRecommendations;
    private getTitleWordsFromVideos;
    private getSimilarVideos;
    private extractTitleWords;
    byChannel(channelId: string, page?: number, limit?: number): Promise<{
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
    getTrendingVideos(): Promise<{
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
