import { Channel } from '@prisma/client';
interface IRequestUser {
    id: string;
    name: string;
    email: string;
    password: string;
    verificationToken: string | null;
    createdAt: Date;
    updatedAt: Date;
    channel: Channel;
}
export declare const CurrentUser: (...dataOrPipes: (keyof IRequestUser | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export {};
