'use client'

import { useQuery } from '@tanstack/react-query'
import { ListVideo } from 'lucide-react'
import { useParams } from 'next/navigation'
import { playlistService } from 'src/services/playlist.service'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Heading } from 'ui/heading/Heading'
import { VideoItem } from 'ui/video-item/VideoItem'

export function SinglePlaylist() {
	const { id } = useParams()

	const { data, isLoading } = useQuery({
		queryKey: ['playlist', id],
		queryFn: () => playlistService.getPlaylistById(id as string),
		enabled: !!id
	})

	return (
		<section>
			<Heading
				isPageHeading
				Icon={ListVideo}
			>
				{data?.data.title}
			</Heading>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				) : data?.data.videos?.length ? (
					data?.data.videos?.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Videos in playlist not found!</p>
				)}
			</div>
		</section>
	)
}
