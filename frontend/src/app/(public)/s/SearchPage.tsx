'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { videoService } from 'src/services/video.service'

import { Heading } from 'ui/Heading'
import { SkeletonLoader } from 'ui/SkeletonLoader'
import { VideoItem } from 'ui/video-item/VideoItem'

export function SearchPage() {
	const term = useSearchParams().get('term')

	const { data, isLoading } = useQuery({
		queryKey: ['search', term],
		queryFn: () => videoService.getAll(term)
	})

	return (
		<section>
			<Heading
				isH1
				Icon={Search}
			>
				Search &quot;{term}&quot;
			</Heading>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				) : data?.data.videos.length ? (
					data.data.videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Videos not found!</p>
				)}
			</div>
		</section>
	)
}
