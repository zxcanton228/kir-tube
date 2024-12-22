'use client'

import { useQuery } from '@tanstack/react-query'
import { Compass } from 'lucide-react'
import { videoService } from 'src/services/video.service'

import { Heading } from 'ui/Heading'
import { SkeletonLoader } from 'ui/SkeletonLoader'
import { VideoItem } from 'ui/video-item/VideoItem'

export const Explore = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['explore'],
		queryFn: () => videoService.getExploreVideos()
	})
	return (
		<section>
			<Heading Icon={Compass}>Explore</Heading>
			<div className='grid-6-cols'>
				{isLoading ? (
					<SkeletonLoader
						className='h-44 rounded-md'
						count={6}
					/>
				) : (
					!!data?.data.videos.length &&
					data?.data.videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				)}
			</div>
		</section>
	)
}
