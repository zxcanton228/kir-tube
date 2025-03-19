import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class FileValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
