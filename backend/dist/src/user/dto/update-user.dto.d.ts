export declare class CreateChannelDto {
    slug: string;
    description?: string;
    avatarUrl?: string;
    bannerUrl?: string;
}
export declare class CreateUserDto {
    name?: string;
    email: string;
    password?: string;
    channel?: CreateChannelDto;
}
export type UpdateUserDto = Partial<CreateUserDto>;
