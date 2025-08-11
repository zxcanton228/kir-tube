import { ConfigService } from '@nestjs/config'
import 'dotenv/config'

export const CLIENT_URL = process.env.CLIENT_URL
export const isDev = (configService: ConfigService) =>
	configService.get('NODE_ENV') === 'development'

export const IS_DEV_ENV = process.env.NODE_ENV === 'development'
