'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { videoService } from 'src/services/video.service'

import { useAuth } from 'src/hooks/useAuth'
import { useEffectScroll } from 'src/hooks/useEffectScroll'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { VideoItem } from 'ui/video-item/VideoItem'

export const Explore = () => {
	const { user } = useAuth()
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['explore'],
		queryFn: ({ pageParam }) =>
			videoService.getExploreVideos(user?.id, { page: pageParam.page, limit: 12 }, pageParam.excludeIds),
		initialPageParam: { page: 1, excludeIds: [] as string[] },
		getNextPageParam: (lastPage, allPages) => {
			const { page, totalPages } = lastPage
			const allVideos = allPages.flatMap(page => page.videos.map(video => video.id))
			return page < totalPages ? { page: page + 1, excludeIds: allVideos } : undefined
		}
	})

	useEffectScroll({ fetchNextPage, hasNextPage, isFetchingNextPage })

	const allVideos = data?.pages.flatMap(({ videos }) => videos) || []

	return (
		<section className='videos-grid pb-5'>
			{isLoading && !allVideos.length ? (
				<SkeletonLoader
					count={6}
					className='h-36 rounded-md'
				/>
			) : !!allVideos.length ? (
				allVideos.map(video => (
					<VideoItem
						key={video.id}
						video={video}
					/>
				))
			) : (
				<h1 className='text-center'>Sign in to view recommendations </h1>
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
