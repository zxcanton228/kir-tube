import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { CHANNELS } from 'seeder/channels.data'

export async function getChannels(prisma: PrismaClient) {
	const channelSlugToId = new Map<string, string>()

	for (const channel of CHANNELS) {
		const password = '123456'
		const hashedPassword = await hash(password)

		const email = `${channel.slug}@test.com`

		const user = await prisma.user.create({
			data: {
				name: channel.name,
				email: email,
				password: hashedPassword
			}
		})

		const createdChannel = await prisma.channel.create({
			data: {
				slug: channel.slug,
				description: channel.description || '',
				avatarUrl: channel.avatarUrl || '',
				bannerUrl: channel.bannerUrl || '',
				isVerified: channel.isVerified || false,
				user: {
					connect: { id: user.id }
				}
			}
		})

		channelSlugToId.set(channel.slug, createdChannel.id)
	}

	return channelSlugToId
}
