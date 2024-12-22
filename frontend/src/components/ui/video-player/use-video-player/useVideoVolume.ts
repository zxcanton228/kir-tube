import { type RefObject, useState } from 'react'

export function useVideoVolume(playerRef: RefObject<HTMLVideoElement>) {
	const [volume, setVolume] = useState<number>(1)
	const [isMuted, setIsMuted] = useState<boolean>(false)

	const changeVolume = (value: number) => {
		if (!playerRef.current) return
		playerRef.current.volume = value
		setVolume(value)
		setIsMuted(value === 0)
	}
	const toggleMute = () => {
		if (!playerRef.current) return
		const muted = !playerRef.current.muted
		playerRef.current.muted = muted
		setIsMuted(muted)
	}
	return { volume, isMuted, changeVolume, toggleMute }
}
