import { IFile, IMediaResponse } from './media.interface';
export declare class MediaService {
    private readonly _outputDir;
    private processingStatus;
    saveMedia(files: IFile[], folder?: string): Promise<IMediaResponse[]>;
    private isVideo;
    private processVideo;
    private getVideoResolution;
    private convertVideo;
    getProcessingStatus(fileName: string): number;
    private mapResolution;
}
