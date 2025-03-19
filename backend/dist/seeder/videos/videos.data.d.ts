import { EnumVideoPlayerQuality } from '@/video/dto/video.types';
export declare const VIDEOS: ({
    title: string;
    viewsCount: number;
    thumbnailUrl: string;
    slug: string;
    videoFileName: string;
    maxResolution: EnumVideoPlayerQuality;
    description: string;
    channelSlug: string;
    isPublic: boolean;
    tags: string[];
} | {
    title: string;
    viewsCount: number;
    thumbnailUrl: string;
    videoFileName: string;
    maxResolution: EnumVideoPlayerQuality;
    description: string;
    channelSlug: string;
    isPublic: boolean;
    tags: string[];
})[];
