import { useEffect, useRef, useState } from 'react'

import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from './video-player.types'
import { getVideoInfo } from './video-player.util'

const SKIP_TIME_SECONDS = 10

export function useVideoPlayer(fileName: string) {
	const playerRef = useRef<HTMLCustomVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState<boolean>(false),
		[quality, setQuality] = useState<EnumVideoPlayerQuality>(EnumVideoPlayerQuality['1080p']),
		[currentTime, setCurrentTime] = useState<number>(0),
		[videoTime, setVideoTime] = useState<number>(0),
		[progress, setProgress] = useState<number>(0)

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause()
		} else {
			playerRef.current?.play()
		}
		setIsPlaying(!isPlaying)
	}
	const skipTime = (type?: 'forward' | 'backward') => {
		if (!playerRef.current?.currentTime) return

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS
		}
	}
	const toggleFullScreen = () => {
		if (!playerRef.current) return
		switch (true) {
			case !!playerRef?.current.requestFullscreen:
				playerRef.current.requestFullscreen()
				break
			case !!playerRef.current.mozRequestFullScreen:
				playerRef.current.mozRequestFullScreen()
				break
			case !!playerRef.current.webkitRequestFullscreen:
				playerRef.current.webkitRequestFullscreen()
				break
			case !!playerRef.current.msRequestFullscreen:
				playerRef.current.msRequestFullscreen()
				break
			default:
				console.error('Fullscreen API is not supported')
				return
		}
	}
	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef.current) return
		setQuality(quality)

		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`
		playerRef.current.currentTime = currentTime

		playerRef.current.play()
		setIsPlaying(true)
	}

	useEffect(() => {
		if (!playerRef?.current) return

		const { currentTime, progress, originalTime } = getVideoInfo(playerRef.current)

		setVideoTime(originalTime)
		setCurrentTime(currentTime)
		setProgress(progress)
	}, [playerRef.current?.duration])
	useEffect(() => {
		const player = playerRef?.current

		const updateProgress = () => {
			if (!player) return

			const { currentTime, progress } = getVideoInfo(player)

			setCurrentTime(currentTime)
			setProgress(progress)
		}

		player?.addEventListener('timeupdate', updateProgress)

		return () => {
			player?.removeEventListener('timeupdate', updateProgress)
		}
	}, [])

	return {
		state: {
			isPlaying,
			progress,
			currentTime,
			videoTime,
			quality
		},
		fn: {
			togglePlayPause,
			changeQuality,
			toggleFullScreen,
			skipTime
		},
		playerRef
	}
}
