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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma.service");
const user_service_1 = require("../user/user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const lodash_1 = require("lodash");
let AuthService = class AuthService {
    constructor(jwt, userService, emailService, prisma) {
        this.jwt = jwt;
        this.userService = userService;
        this.emailService = emailService;
        this.prisma = prisma;
        this.TOKEN_EXPIRATION_ACCESS = '1h';
        this.TOKEN_EXPIRATION_REFRESH = '7d';
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        return this.buildResponseObject(user);
    }
    async register(dto) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        const user = await this.prisma.user.create({
            data: {
                ...dto,
                password: await (0, argon2_1.hash)(dto.password)
            }
        });
        await this.emailService.sendVerification(user.email, `http://localhost:4200/verify-email?token=${user.verificationToken}`);
        return this.buildResponseObject(user);
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwt.verifyAsync(refreshToken);
        if (!result) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const user = await this.userService.byId(result.id);
        return this.buildResponseObject(user);
    }
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({
            where: {
                verificationToken: token
            }
        });
        if (!user)
            throw new common_1.NotFoundException('Token not exists!');
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                verificationToken: null
            }
        });
        return 'Email verified!';
    }
    async buildResponseObject(user) {
        const tokens = await this.issueTokens(user.id);
        return { user, ...tokens };
    }
    async issueTokens(userId, isAdmin) {
        const payload = { id: userId, isAdmin };
        const accessToken = this.jwt.sign(payload, {
            expiresIn: this.TOKEN_EXPIRATION_ACCESS
        });
        const refreshToken = this.jwt.sign(payload, {
            expiresIn: this.TOKEN_EXPIRATION_REFRESH
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email or password invalid');
        }
        const isValid = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Email or password invalid');
        }
        return user;
    }
    omitPassword(user) {
        return (0, lodash_1.omit)(user, ['password']);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        email_service_1.EmailService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map