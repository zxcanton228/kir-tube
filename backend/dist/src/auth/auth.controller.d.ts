import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenService } from './refresh-token.service';
export declare class AuthController {
    private readonly authService;
    private readonly refreshTokenService;
    constructor(authService: AuthService, refreshTokenService: RefreshTokenService);
    login(dto: AuthDto, res: Response): Promise<{
        accessToken: string;
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
    register(dto: AuthDto, res: Response): Promise<{
        accessToken: string;
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
    verifyEmail(token?: string): Promise<string>;
    getNewTokens(req: Request, res: Response): Promise<{
        accessToken: string;
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
    logout(res: Response): Promise<boolean>;
}
