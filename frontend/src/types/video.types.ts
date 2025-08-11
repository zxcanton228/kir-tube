import type { EnumVideoPlayerQuality } from 'ui/video-player/video-player.types'

import type { IChannel } from './channel.types'
import type { IComment } from './comment.types'
import type { IPagination } from './pagination.types'

export interface IVideo {
	id: string
	publicId: string
	title: string
	description: string
	thumbnailUrl: string
	videoFileName: string
	maxResolution: EnumVideoPlayerQuality
	viewsCount: number
	isPublic: boolean
	channelId: string
	createdAt: Date
	updatedAt: Date
	channel: IChannel
	tags: ITag[]
}
export interface IFullVideo extends IVideo {
	likes: []
	comments: IComment[]
}
export interface ISingleVideoResponse extends IFullVideo {
	similarVideos: IVideo[]
}
export interface IStudioVideoResponse extends IFullVideo {
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

export interface IVideosPagination extends IPagination {
	videos: IVideo[]
}

interface ITag {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
}
