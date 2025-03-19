import { PrismaService } from '@/prisma.service';
export declare class ChannelService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    bySlug(slug: string): Promise<{
        user: {
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        };
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
    }>;
    getAll(): Promise<{
        id: string;
        slug: string;
        description: string | null;
        isVerified: boolean;
        avatarUrl: string | null;
        bannerUrl: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    toggleSubscribe(slug: string, userId: string): Promise<{
        message: string;
        isSubscribed: boolean;
    }>;
}
