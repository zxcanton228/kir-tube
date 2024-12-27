import type { IVideo } from './video.types'

export interface IPlaylist {
	id: string
	title: string
	videos: IVideo[]
	userId: string
	createdAt: string | Date
	updatedAt: string | Date
}

export interface IPlaylistData {
	title: string
	videoPublicId: string
}
