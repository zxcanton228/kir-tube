import type { IVideo } from './video.types'

export interface IVideoFormData
	extends Omit<IVideo, 'publicId' | 'createdAt' | 'updatedAt' | 'channel' | 'id' | 'viewsCount' | 'tags' | 'isPublic'> {
	tags: string[]
}
