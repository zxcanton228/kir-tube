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
exports.MediaController = void 0;
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_service_1 = require("./media.service");
const file_validation_pipe_1 = require("./pipes/file.validation.pipe");
const folder_validation_pipe_1 = require("./pipes/folder.validation.pipe");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async uploadMediaFile(mediaFile, folder) {
        return this.mediaService.saveMedia(mediaFile, folder);
    }
    async getProcessingStatus(fileName) {
        const status = this.mediaService.getProcessingStatus(fileName);
        return { fileName, status };
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file')),
    (0, common_1.UsePipes)(new folder_validation_pipe_1.FolderValidationPipe()),
    __param(0, (0, common_1.UploadedFiles)(file_validation_pipe_1.FileValidationPipe)),
    __param(1, (0, common_1.Query)('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadMediaFile", null);
__decorate([
    (0, common_1.Get)('status/:fileName'),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Param)('fileName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getProcessingStatus", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('upload-file'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map