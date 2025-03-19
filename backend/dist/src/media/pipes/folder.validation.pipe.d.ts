import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class FolderValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
