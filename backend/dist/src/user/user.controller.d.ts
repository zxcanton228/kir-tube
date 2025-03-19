import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(id: string): Promise<{
        subscribedVideos: ({
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
            likes: {
                id: string;
                userId: string;
                createdAt: Date;
                videoId: string;
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
        name: string | null;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        verificationToken: string | null;
        subscriptions: {
            id: string;
            slug: string;
            description: string | null;
            isVerified: boolean;
            avatarUrl: string | null;
            bannerUrl: string | null;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        likes: ({
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
            createdAt: Date;
            videoId: string;
        })[];
    }>;
    updateProfile(id: string, dto: UpdateUserDto): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        verificationToken: string | null;
    }>;
    toggleLike(videoId: string, user: User): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        videoId: string;
    }>;
}
