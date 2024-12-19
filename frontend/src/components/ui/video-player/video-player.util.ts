import type { HTMLCustomVideoElement } from './video-player.types'

type Out = (video: HTMLCustomVideoElement) => {
	currentTime: number
	originalTime: number
	progress: number
}
export const getVideoInfo: Out = video => {
	const currentTime = video.currentTime
	const originalTime = video.duration

	return {
		currentTime,
		originalTime,
		progress: (currentTime / originalTime) * 100
	}
}
