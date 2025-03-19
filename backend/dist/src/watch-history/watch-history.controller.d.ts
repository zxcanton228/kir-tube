import { WatchHistoryService } from './watch-history.service';
export declare class WatchHistoryController {
    private readonly watchHistoryService;
    constructor(watchHistoryService: WatchHistoryService);
    getUserHistory(userId: string): Promise<({
        video: {
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
        };
    } & {
        id: string;
        userId: string;
        videoId: string;
        watchedAt: Date;
    })[]>;
    addToHistory(userId: string, videoId: string): Promise<{
        id: string;
        userId: string;
        videoId: string;
        watchedAt: Date;
    }>;
    clearHistory(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
