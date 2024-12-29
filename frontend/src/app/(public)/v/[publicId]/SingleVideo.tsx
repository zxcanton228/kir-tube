'use client'

import cn from 'clsx'
import dynamic from 'next/dynamic'
import { type FC, useState } from 'react'
import type { ISingleVideoResponse } from 'src/types/video.types'

import { Heading } from 'ui/Heading'
import { SkeletonLoader } from 'ui/SkeletonLoader'
import { VideoPlayer } from 'ui/video-player/VideoPlayer'

import { SimilarVideos } from './SimilarVideos'
import { VideoDescription } from './description/VideoDescription'
import { useUpdateViews } from './useUpdateViews'
import { VideoChannel } from './video-channel/VideoChannel'

const DynamicComments = dynamic(() => import('./comments/Comments').then(mod => mod.Comments))

const VideoActions = dynamic(() => import('./video-actions/VideoActions').then(mod => mod.VideoActions), {
	ssr: false,
	loading: () => <SkeletonLoader className='w-32 h-8' />
})

export const SingleVideo: FC<{ video: ISingleVideoResponse }> = ({ video }) => {
	const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false)
	useUpdateViews(video.publicId, video.id)
	return (
		<section className='grid gap-20 grid-cols-[3fr_.8fr] relative'>
			<div>
				<div className={cn(isTheaterMode ? 'absolute top-0 left-0 w-full' : 'relative')}>
					<VideoPlayer
						fileName={video.videoFileName}
						maxResolution={video.maxResolution}
						toggleTheaterMode={() => {
							setIsTheaterMode(s => !s)
						}}
					/>
				</div>

				<div
					className={cn('flex justify-between items-start pb-6 mb-6 border-b border-border', {
						'pt-[55.5rem]': isTheaterMode
					})}
				>
					<div>
						<Heading
							className='mb-1'
							isH1
							classNameHeading='text-xl'
						>
							{video.title}
						</Heading>
						<div className='text-gray-400'>{video.viewsCount.toLocaleString('ru-RU')} views</div>
					</div>
					<VideoActions video={video} />
				</div>
				<VideoChannel channel={video.channel} />

				<VideoDescription description={video.description} />
				<DynamicComments video={video} />
			</div>

			{!!video.similarVideos.length && (
				<div
					className={cn({
						'pt-[55.5rem]': isTheaterMode
					})}
				>
					<SimilarVideos videos={video.similarVideos} />
				</div>
			)}
		</section>
	)
}
