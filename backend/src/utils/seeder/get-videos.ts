import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient, Video } from '@prisma/client'
import { hash } from 'argon2'
import { nanoid } from 'nanoid'
import { VIDEOS } from 'seeder/videos/videos.data'

async function getRandomUser(prisma: PrismaClient) {
	const usersData: Prisma.UserCreateManyInput[] = []

	for (let i = 0; i < 16; i++) {
		usersData.push({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: await hash('123456')
		})
	}

	return prisma.user.createManyAndReturn({
		skipDuplicates: true,
		data: usersData,
		select: { id: true }
	})
}

export async function getVideos(
	prisma: PrismaClient,
	channelSlugToId: Map<string, string>
) {
	const commentsData: Prisma.VideoCommentCreateManyInput[] = []
	const likesData: Prisma.VideoLikeCreateManyInput[] = []
	const videos: Pick<Video, 'id' | 'createdAt'>[] = []

	for (const videoData of VIDEOS) {
		const channelId = channelSlugToId.get(videoData.channelSlug)

		if (!channelId) {
			console.warn(
				`Канал с slug '${videoData.channelSlug}' не найден. Видео '${videoData.title}' пропущено.`
			)
			continue
		}

		// Генерируем случайную дату создания (от 0 до 365 дней назад)
		const createdAt = faker.date.between({
			from: faker.date.recent({
				days: 365
			}),
			to: new Date()
		})

		const vid = await prisma.video.create({
			data: {
				tags: {
					connectOrCreate: videoData.tags.map(tag => ({
						where: { name: tag },
						create: { name: tag }
					}))
				},
				videoFileName: videoData.videoFileName || '',
				thumbnailUrl: videoData.thumbnailUrl || '',
				description: videoData.description || '',
				maxResolution: videoData.maxResolution,
				viewsCount: videoData.viewsCount || 0,
				isPublic: videoData.isPublic || false,
				title: videoData.title,
				publicId: nanoid(10),
				channelId,
				createdAt
			},
			select: { id: true, createdAt: true }
		})
		videos.push(vid)
	}

	const randomUsers = await getRandomUser(prisma)

	for (const video of videos) {
		const numComments = Math.floor(Math.random() * 16)

		for (let i = 0; i < numComments; i++) {
			commentsData.push({
				text: faker.lorem.sentences(),
				userId: randomUsers[i].id,
				videoId: video.id,
				createdAt: faker.date.between({
					from: video.createdAt,
					to: new Date()
				})
			})
		}

		const numLikes = Math.floor(Math.random() * 16)
		const likedUserIds = new Set<string>()

		for (let i = 0; i < numLikes; i++) {
			const userId = randomUsers[i].id

			if (!likedUserIds.has(userId)) {
				likedUserIds.add(userId)

				likesData.push({
					userId: userId,
					videoId: video.id,
					createdAt: faker.date.between({
						from: video.createdAt,
						to: new Date()
					})
				})
			}
		}
	}

	await Promise.all([
		prisma.videoComment.createMany({ data: commentsData }),
		prisma.videoLike.createMany({ data: likesData })
	])
}
