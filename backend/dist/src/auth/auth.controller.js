"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const google_recaptcha_1 = require("@nestlab/google-recaptcha");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const refresh_token_service_1 = require("./refresh-token.service");
let AuthController = class AuthController {
    constructor(authService, refreshTokenService) {
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
    }
    async login(dto, res) {
        const { refreshToken, ...response } = await this.authService.login(dto);
        this.refreshTokenService.addRefreshTokenToResponse(res, refreshToken);
        return response;
    }
    async register(dto, res) {
        const { refreshToken, ...response } = await this.authService.register(dto);
        this.refreshTokenService.addRefreshTokenToResponse(res, refreshToken);
        return response;
    }
    async verifyEmail(token) {
        if (!token) {
            throw new common_1.UnauthorizedException('Token not passed');
        }
        return this.authService.verifyEmail(token);
    }
    async getNewTokens(req, res) {
        const refreshTokenFromCookies = req.cookies[this.refreshTokenService.REFRESH_TOKEN_NAME];
        if (!refreshTokenFromCookies) {
            this.refreshTokenService.removeRefreshTokenFromResponse(res);
            throw new common_1.UnauthorizedException('Refresh token not passed');
        }
        const { refreshToken, ...response } = await this.authService.getNewTokens(refreshTokenFromCookies);
        this.refreshTokenService.addRefreshTokenToResponse(res, refreshToken);
        return response;
    }
    async logout(res) {
        this.refreshTokenService.removeRefreshTokenFromResponse(res);
        return true;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, google_recaptcha_1.Recaptcha)(),
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.HttpCode)(200),
    (0, google_recaptcha_1.Recaptcha)(),
    (0, common_1.Post)('auth/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('verify-email'),
    (0, common_1.Redirect)('http://localhost:3000/verified', 302),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('auth/access-token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getNewTokens", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('auth/logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        refresh_token_service_1.RefreshTokenService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map