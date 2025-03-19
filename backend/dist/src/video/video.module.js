"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModule = void 0;
const prisma_service_1 = require("../prisma.service");
const common_1 = require("@nestjs/common");
const comment_controller_1 = require("./comment/comment.controller");
const comment_service_1 = require("./comment/comment.service");
const studio_video_controller_1 = require("./studio/studio-video.controller");
const studio_video_service_1 = require("./studio/studio-video.service");
const video_controller_1 = require("./video.controller");
const video_service_1 = require("./video.service");
let VideoModule = class VideoModule {
};
exports.VideoModule = VideoModule;
exports.VideoModule = VideoModule = __decorate([
    (0, common_1.Module)({
        controllers: [video_controller_1.VideoController, studio_video_controller_1.StudioVideoController, comment_controller_1.CommentController],
        providers: [video_service_1.VideoService, studio_video_service_1.StudioVideoService, comment_service_1.CommentService, prisma_service_1.PrismaService],
        exports: [video_service_1.VideoService]
    })
], VideoModule);
//# sourceMappingURL=video.module.js.map