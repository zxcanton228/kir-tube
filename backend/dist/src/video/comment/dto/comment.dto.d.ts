export declare class CreateCommentDto {
    text: string;
    videoId: string;
}
export type UpdateCommentDto = Partial<Omit<CreateCommentDto, 'videoId'>>;
