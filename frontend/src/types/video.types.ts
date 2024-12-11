import type { IChannel } from './channel.types'

export interface IMain<T = IVideo> {
	videos: T[]
	page: number
	limit: number
	totalCount: number
	totalPages: number
}

export interface IVideo {
	id: string
	publicId: string
	title: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	maxResolution: IMaxResolution
	viewsCount: number
	isPublic: boolean
	channelId: string
	createdAt: Date
	updatedAt: Date
	channel: IChannel
	tags: ITag[]
}

export interface IUser {
	id: string
	name: string
	email: string
	password: string
	verificationToken: string
	createdAt: Date
	updatedAt: Date
}

export enum IMaxResolution {
	'4K' = '4K',
	'2K' = '2K',
	'1080p' = '1080p',
	'720p' = '720p',
	'480p' = '480p',
	'360p' = '360p'
}

export interface ITag {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
}
