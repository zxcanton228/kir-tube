import { IFile } from './media.interface';
import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    uploadMediaFile(mediaFile: IFile[], folder?: string): Promise<import("./media.interface").IMediaResponse[]>;
    getProcessingStatus(fileName: string): Promise<{
        fileName: string;
        status: number;
    }>;
}
