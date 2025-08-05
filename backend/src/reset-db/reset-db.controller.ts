import {
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ResetDbService } from './reset-db.service'

@Controller('reset-db')
export class ResetDbController {
	constructor(
		private readonly resetDbService: ResetDbService,
		private readonly configService: ConfigService
	) {}

	@Post()
	@HttpCode(200)
	run(@Body() body: { password: string }): Promise<string> {
		if (body.password !== this.configService.get<string>('SEED_PASSWORD')) {
			throw new UnauthorizedException('Invalid password')
		}

		return this.resetDbService.resetDb()
	}

	@Cron(CronExpression.EVERY_WEEK, {
		name: 'cron-reset-db',
		timeZone: 'Europe/Moscow',
	})
	runCronProxy() {
		return this.resetDbService.resetDb()
	}
}
