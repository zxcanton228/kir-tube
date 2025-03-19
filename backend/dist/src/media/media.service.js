"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const video_types_1 = require("../video/dto/video.types");
const app_root_path_1 = require("app-root-path");
const ffmpeg = require("fluent-ffmpeg");
const fs_extra_1 = require("fs-extra");
const path = require("path");
const generate_filename_1 = require("./generate-filename");
const resolution_data_1 = require("./resolution.data");
let MediaService = class MediaService {
    constructor() {
        this._outputDir = path.join(app_root_path_1.path, 'uploads');
        this.processingStatus = new Map();
    }
    async saveMedia(files, folder = 'default') {
        const folderLowerCase = folder.toLowerCase();
        const uploadFolder = path.join(this._outputDir, folderLowerCase);
        await (0, fs_extra_1.ensureDir)(uploadFolder);
        const file = files[0];
        const uniqueFileName = (0, generate_filename_1.generateFilename)(file?.originalname || file?.name);
        const filePath = path.join(uploadFolder, uniqueFileName);
        if (this.isVideo(file)) {
            await (0, fs_extra_1.writeFile)(filePath, file.buffer);
            const { width: inputWidth, height: inputHeight } = await this.getVideoResolution(filePath);
            const maxResolution = this.mapResolution(inputWidth, inputHeight);
            this.processingStatus.set(uniqueFileName, 0);
            this.processVideo(filePath, uniqueFileName, folderLowerCase)
                .then(() => {
                this.processingStatus.set(uniqueFileName, 100);
            })
                .catch(err => {
                this.processingStatus.set(uniqueFileName, -1);
                console.error('Ошибка при обработке видео:', err);
            });
            return [
                {
                    url: `/uploads/${folderLowerCase}/${uniqueFileName}`,
                    name: uniqueFileName,
                    maxResolution
                }
            ];
        }
        else {
            await (0, fs_extra_1.writeFile)(filePath, file.buffer);
            return [
                {
                    url: `/uploads/${folderLowerCase}/${uniqueFileName}`,
                    name: uniqueFileName
                }
            ];
        }
    }
    isVideo(file) {
        return file.mimetype.startsWith('video/');
    }
    async processVideo(inputPath, fileName, folder) {
        try {
            const { width: inputWidth, height: inputHeight } = await this.getVideoResolution(inputPath);
            const availableResolutions = resolution_data_1.RESOLUTIONS.filter(resolution => resolution.width <= inputWidth && resolution.height <= inputHeight);
            const totalResolutions = availableResolutions.length;
            for (let i = 0; i < totalResolutions; i++) {
                const resolution = availableResolutions[i];
                await this.convertVideo(inputPath, resolution, fileName, folder, totalResolutions, i);
            }
            this.processingStatus.set(fileName, 100);
        }
        catch (err) {
            this.processingStatus.set(fileName, -1);
            console.error('Ошибка при обработке видео:', err);
        }
    }
    getVideoResolution(filePath) {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(filePath, (err, metadata) => {
                if (err) {
                    reject(err);
                }
                else {
                    const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
                    if (videoStream) {
                        resolve({
                            width: videoStream.width,
                            height: videoStream.height
                        });
                    }
                    else {
                        reject(new Error('Видео поток не найден'));
                    }
                }
            });
        });
    }
    async convertVideo(inputPath, resolution, fileName, folder, totalResolutions, currentResolutionIndex) {
        const outputDir = path.join(this._outputDir, folder, resolution.name);
        await (0, fs_extra_1.ensureDir)(outputDir);
        const outputPath = path.join(outputDir, fileName);
        return new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .size(`${resolution.width}x${resolution.height}`)
                .output(outputPath)
                .on('progress', progress => {
                const percent = progress.percent || 0;
                const perResolutionProgress = 1 / totalResolutions;
                const overallProgress = ((currentResolutionIndex + percent / 100) / totalResolutions) * 100;
                this.processingStatus.set(fileName, overallProgress);
            })
                .on('end', () => {
                resolve();
            })
                .on('error', err => {
                reject(err);
            })
                .run();
        });
    }
    getProcessingStatus(fileName) {
        return this.processingStatus.get(fileName) || 0;
    }
    mapResolution(width, height) {
        const resolutions = [
            { width: 3840, height: 2160, name: video_types_1.EnumVideoPlayerQuality['4K'] },
            { width: 2560, height: 1440, name: video_types_1.EnumVideoPlayerQuality['2K'] },
            { width: 1920, height: 1080, name: video_types_1.EnumVideoPlayerQuality['1080p'] },
            { width: 1280, height: 720, name: video_types_1.EnumVideoPlayerQuality['720p'] },
            { width: 854, height: 480, name: video_types_1.EnumVideoPlayerQuality['480p'] },
            { width: 640, height: 360, name: video_types_1.EnumVideoPlayerQuality['360p'] }
        ];
        for (const res of resolutions) {
            if (width >= res.width && height >= res.height) {
                return res.name;
            }
        }
        return video_types_1.EnumVideoPlayerQuality['720p'];
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)()
], MediaService);
//# sourceMappingURL=media.service.js.map