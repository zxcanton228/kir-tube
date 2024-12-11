import type { IUser } from './video.types'

export interface IChannel {
	id: string
	slug: string
	description: string
	isVerified: boolean
	avatarUrl: string
	bannerUrl: string
	userId: string
	createdAt: Date
	updatedAt: Date
	user: IUser
}
