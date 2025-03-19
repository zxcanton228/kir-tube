import { EnumVideoPlayerQuality } from './video.types';
export declare class CreateVideoDto {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoFileName: string;
    maxResolution?: EnumVideoPlayerQuality;
    isPublic?: boolean;
    tags?: string[];
}
export type UpdateVideoDto = Partial<CreateVideoDto>;
