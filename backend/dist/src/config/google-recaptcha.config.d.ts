import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha/interfaces/google-recaptcha-module-options';
export declare const getGoogleRecaptchaConfig: (configService: ConfigService) => Promise<GoogleRecaptchaModuleOptions>;
