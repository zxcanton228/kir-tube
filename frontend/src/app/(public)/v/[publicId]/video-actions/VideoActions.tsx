'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { type FC, startTransition, useEffect, useState } from 'react'
import { userService } from 'src/services/studio/user.service'
import type { ISingleVideoResponse } from 'src/types/video.types'

import { useProfile } from 'src/hooks/useProfile'

import { transformCount } from 'src/utils/transform-count'

import { SaveToPlaylist } from './SaveToPlaylist'

export const VideoActions: FC<{ video: ISingleVideoResponse }> = ({ video }) => {
	const { profile, refetch } = useProfile()

	const isLiked: boolean = profile?.likes.some(like => like.videoId === video.id) || false

	const [isLikedLocal, setIsLikedLocal] = useState<boolean>(isLiked)

	const [optimisticLike, setOptimisticLike] = useState<number>(video.likes.length)

	useEffect(() => {
		setIsLikedLocal(isLiked)
	}, [isLiked])

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userService.toggleLike(video.id),
		onMutate: () => {
			startTransition(() => {
				const newIsLiked = !isLikedLocal
				setIsLikedLocal(newIsLiked)
				setOptimisticLike(prevLikeCount => {
					if (newIsLiked) return prevLikeCount + 1
					return prevLikeCount - 1
				})
			})
		},
		onError: () => {
			startTransition(() => {
				const revertedIsLiked = !isLikedLocal
				setIsLikedLocal(revertedIsLiked)
				setOptimisticLike(prevLikeCount => {
					if (revertedIsLiked) return prevLikeCount + 1
					return prevLikeCount - 1
				})
			})
		},
		onSuccess: () => {
			refetch()
		}
	})

	return (
		profile && (
			<div className='flex items-center gap-7'>
				<SaveToPlaylist videoId={video.id} />
				<button
					onClick={() => mutate()}
					className='text-[#FF453A] flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100'
				>
					<Heart
						fill={isLikedLocal ? '#FF453A' : 'transparent'}
						size={20}
					/>
					{transformCount(optimisticLike)}
				</button>
			</div>
		)
	)
}
