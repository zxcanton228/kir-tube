'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { studioVideoService } from 'src/services/studio/studio-video.service'

import { useEffectScroll } from 'src/hooks/useEffectScroll'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { StudioVideoItem } from 'ui/video-item/studio/StudioVideoItem'

export const StudioVideoListSection = () => {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['studioVideoList'],
		queryFn: ({ pageParam }) => studioVideoService.getAll({ page: pageParam.page, limit: 8 }),
		initialPageParam: { page: 1 },
		getNextPageParam: lastPage => {
			const { page, totalPages } = lastPage

			return page < totalPages ? { page: page + 1 } : undefined
		}
	})
	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })
	const allVideos = data?.pages.flatMap(({ videos }) => videos) || []

	return (
		<section className='pb-5'>
			{isLoading && !allVideos.length ? (
				<SkeletonLoader
					count={6}
					className='h-36 rounded-md'
				/>
			) : (
				allVideos.map(video => (
					<StudioVideoItem
						key={video.id}
						// @ts-ignore
						video={video}
					/>
				))
			)}

			{isFetchingNextPage && (
				<SkeletonLoader
					count={6}
					className='h-36 rounded-md'
				/>
			)}
		</section>
	)
}
