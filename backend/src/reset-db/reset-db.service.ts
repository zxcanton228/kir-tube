import { PrismaService } from '@/prisma.service'
import { seeder } from '@/utils/seeder/seeder'
import { BadGatewayException, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ResetDbService {
	constructor(private readonly prismaService: PrismaService) {}

	private readonly logger = new Logger()

	async resetDb() {
		await this._clearDb()
		const counts = []

		counts.push(
			this.prismaService.videoComment.count(),
			this.prismaService.watchHistory.count(),
			this.prismaService.videoLike.count(),
			this.prismaService.videoTag.count(),
			this.prismaService.playlist.count(),
			this.prismaService.channel.count(),
			this.prismaService.video.count(),
			this.prismaService.user.count()
		)
		console.log((await Promise.all(counts)).every(v => v === 0))

		try {
			await seeder(this.prismaService)
			return 'Заполнение базы данных завершено успешно.'
		} catch (error) {
			console.error(error)
			this.logger.error('Ошибка при заполнении базы данных:')
			throw new BadGatewayException()
		}
	}
	private async _clearDb() {
		await this.prismaService.$transaction(async tx => {
			await tx.videoComment.deleteMany()
			await tx.videoLike.deleteMany()
			await tx.videoTag.deleteMany()
			await tx.watchHistory.deleteMany()
			await tx.playlist.deleteMany()
			await tx.video.deleteMany()
			await tx.channel.deleteMany()
			await tx.user.deleteMany()
		})
	}
}
