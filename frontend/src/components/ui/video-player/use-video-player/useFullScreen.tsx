import { type RefObject } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

export function useFullScreen(playerRef: RefObject<HTMLCustomVideoElement>) {
	const toggleFullScreen = () => {
		if (!playerRef.current) return

		const player = playerRef.current

		switch (true) {
			case !!player.requestFullscreen:
				player.requestFullscreen()
				break
			case !!player.mozRequestFullScreen:
				player.mozRequestFullScreen()
				break
			case !!player.webkitRequestFullscreen:
				player.webkitRequestFullscreen()
				break
			case !!player.msRequestFullscreen:
				player.msRequestFullscreen()
				break
			default:
				player.requestFullscreen()
				break
		}
	}
	return toggleFullScreen
}
