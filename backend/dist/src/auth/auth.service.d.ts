import { EmailService } from '@/email/email.service';
import { PrismaService } from '@/prisma.service';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private jwt;
    private userService;
    private emailService;
    private prisma;
    constructor(jwt: JwtService, userService: UserService, emailService: EmailService, prisma: PrismaService);
    private readonly TOKEN_EXPIRATION_ACCESS;
    private readonly TOKEN_EXPIRATION_REFRESH;
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: Omit<{
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        }, "password">;
    }>;
    register(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: Omit<{
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        }, "password">;
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: Omit<{
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        }, "password">;
    }>;
    verifyEmail(token: string): Promise<string>;
    buildResponseObject(user: Omit<User, 'password'>): Promise<{
        accessToken: string;
        refreshToken: string;
        user: Omit<{
            name: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            verificationToken: string | null;
        }, "password">;
    }>;
    private issueTokens;
    private validateUser;
    private omitPassword;
}
