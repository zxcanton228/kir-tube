import { type RefObject } from 'react'

import { SKIP_TIME_SECONDS } from 'src/constants/constants'

import type { HTMLCustomVideoElement } from '../video-player.types'

export type TSkipTime = 'forward' | 'backward'

export function useSkipTime(playerRef: RefObject<HTMLCustomVideoElement>, bgRef: RefObject<HTMLCustomVideoElement>) {
	const skipTime = (type?: TSkipTime) => {
		if (!playerRef.current?.currentTime) return

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS
			if (bgRef?.current) {
				bgRef.current.currentTime += SKIP_TIME_SECONDS
			}
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS
			if (bgRef?.current) {
				bgRef.current.currentTime -= SKIP_TIME_SECONDS
			}
		}
	}

	return skipTime
}
