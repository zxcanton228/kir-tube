'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart, ListPlus } from 'lucide-react'
import { type FC, startTransition, useEffect, useState } from 'react'
import { userService } from 'src/services/user.service'
import type { ISingleVideoResponse } from 'src/types/video.types'

import { COLORS } from 'src/constants/colors.constants'

import { useProfile } from 'src/hooks/useProfile'

import { transformCount } from 'src/utils/transform-count'

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
		<div className='flex items-center gap-7'>
			<button className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'>
				<ListPlus size={20} />
				Save
			</button>
			<button
				onClick={() => mutate()}
				className='text-primary flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100'
			>
				<Heart
					fill={isLiked ? COLORS.primary : 'transparent'}
					size={20}
				/>
				{transformCount(optimisticLike)}
			</button>
		</div>
	)
}
