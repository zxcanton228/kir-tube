"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/svg+xml',
    'video/mp4',
    'video/quicktime'
];
const MAX_FILE_SIZE = 300 * 1024 * 1024;
let FileValidationPipe = class FileValidationPipe {
    transform(value, metadata) {
        const files = Array.isArray(value) ? value : [value];
        for (const file of files) {
            if (!file || !file.mimetype) {
                throw new common_1.BadRequestException('No file provided');
            }
            if (!allowedMimeTypes.includes(file.mimetype)) {
                throw new common_1.BadRequestException(`Unsupported file type`);
            }
            if (file.size > MAX_FILE_SIZE) {
                throw new common_1.BadRequestException(`File size is too big`);
            }
        }
        return value;
    }
};
exports.FileValidationPipe = FileValidationPipe;
exports.FileValidationPipe = FileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileValidationPipe);
//# sourceMappingURL=file.validation.pipe.js.map