import type { HTMLCustomVideoElement } from './video-player.types'

type Out = (video?: HTMLCustomVideoElement | null) => {
	currentTime: number
	originalTime: number
	progress: number
}

export const getVideoInfo: Out = video => {
	const currentTime = video?.currentTime || 0
	const originalTime = video?.duration || 1

	return {
		currentTime,
		originalTime,
		progress: (currentTime / originalTime) * 100
	}
}
export const getTime = (time: number) => Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
