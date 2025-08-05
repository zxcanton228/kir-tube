import { PrismaClient } from '@prisma/client'
import { getChannels } from './get-channels'
import { getVideos } from './get-videos'

export async function seeder(prisma: PrismaClient, isForceSeed?: boolean) {
	const logger = (msg: string) => isForceSeed && console.log(msg)

	logger('Начало заполнения базы данных...')

	// Создаём каналы и пользователей
	logger('Создание каналов и пользователей...')

	const channelSlugToId = await getChannels(prisma)

	logger('Каналы и пользователи созданы.')

	// Создаём видео
	logger('Создание видео, комментариев, лайков и тегов...')
	await getVideos(prisma, channelSlugToId)

	logger('Видео, комментарии, лайки и теги созданы.')
}
