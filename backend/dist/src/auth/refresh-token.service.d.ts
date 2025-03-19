import type { Response } from 'express';
export declare class RefreshTokenService {
    readonly EXPIRE_DAY_REFRESH_TOKEN = 7;
    readonly REFRESH_TOKEN_NAME = "refreshToken";
    addRefreshTokenToResponse(res: Response, refreshToken: string): void;
    removeRefreshTokenFromResponse(res: Response): void;
}
