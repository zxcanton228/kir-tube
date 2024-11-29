import { RequestMethod, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'
import { IS_DEV_ENV } from './utils/is-dev.util'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api', {
		exclude: [{ path: 'verify-email', method: RequestMethod.GET }]
	})

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(helmet({ contentSecurityPolicy: IS_DEV_ENV ? false : undefined }))
	app.use(cookieParser())

	app.enableCors({
		origin: process.env.CLIENT_URL,
		credentials: true
	})

	app.disable('x-powered-by')

	const port = process.env.PORT
	await app.listen(port || 4200, () =>
		console.log(`🚀Server started on ${port}`)
	)
}
bootstrap()
