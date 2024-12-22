import { useRef, useState } from 'react'

import { type HTMLCustomVideoElement } from '../video-player.types'

import { useFullScreen } from './useFullScreen'
import { useOnSeek } from './useOnSeek'
import { usePlayPause } from './usePlayPause'
import { useSkipTime } from './useSkipTime'
import { useVideoHotkeys } from './useVideoHotkeys'
import { useVideoProgress } from './useVideoProgress'
import { useVideoQuality } from './useVideoQuality'
import { useVideoVolume } from './useVideoVolume'

export function useVideoPlayer(fileName: string, toggleTheaterMode: () => void) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)
	const bgRef = useRef<HTMLCustomVideoElement>(null)

	const { isPlaying, togglePlayPause, setIsPlaying } = usePlayPause(playerRef, bgRef),
		{ currentTime, progress, videoTime, setCurrentTime } = useVideoProgress(playerRef),
		[isLightingMode, setIsLightingMode] = useState<boolean>(true),
		{ quality, changeQuality } = useVideoQuality(playerRef, {
			fileName,
			currentTime,
			setIsPlaying
		}),
		toggleFullScreen = useFullScreen(playerRef),
		skipTime = useSkipTime(playerRef, bgRef),
		onSeek = useOnSeek(playerRef, bgRef, setCurrentTime),
		{ toggleMute, volume, isMuted, changeVolume } = useVideoVolume(playerRef)

	const fn = {
		togglePlayPause,
		changeQuality,
		toggleFullScreen,
		skipTime,
		changeVolume,
		toggleMute,
		onSeek,
		toggleLightingMode: () => setIsLightingMode(s => !s)
	}
	const state = {
		isPlaying,
		isLightingMode,
		progress,
		currentTime,
		videoTime,
		quality,
		volume,
		isMuted
	}

	useVideoHotkeys({
		...fn,
		volume,
		toggleTheaterMode
	})

	return {
		state,
		fn,
		playerRef,
		bgRef
	}
}
