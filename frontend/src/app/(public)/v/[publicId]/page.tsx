import type { Metadata } from 'next'
import { videoService } from 'src/services/video.service'

import { stripHtml } from 'src/utils/strip-html'

import { Heading } from 'ui/Heading'
import { VideoPlayer } from 'ui/video-player/VideoPlayer'

import { SimilarVideos } from './SimilarVideos'
import { VideoDescription } from './description/VideoDescription'
import { VideoActions } from './video-actions/VideoActions'
import { VideoChannel } from './video-channel/VideoChannel'

// const SubscribeButton = dynamicNext(() => import('src/components/SubscribeButton').then(mod => mod.SubscribeButton), {
// 	ssr: false,
// 	loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' />
// })

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { publicId } = await params
	const data = await videoService.byPublicId(publicId)
	const video = data.data

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl]
		}
	}
}

export async function generateStaticParams() {
	const {
		data: { videos }
	} = await videoService.getAll()

	return videos.map(({ publicId }) => ({
		publicId
	}))
}

export default async function VideoPage({ params }: any) {
	const { publicId } = await params
	const { data: video } = await videoService.byPublicId(publicId)
	return (
		<section className='grid grid-cols-[3fr_.8fr] gap-20'>
			<div>
				<div className='relative w-full  rounded-2xl overflow-hidden shadow-md mb-6'>
					<VideoPlayer fileName={video.videoFileName} />
				</div>
				<div className='flex justify-between items-start pb-6 mb-6 border-b border-border'>
					<div>
						<Heading
							className='mb-1'
							classNameHeading='text-xl'
							isPageHeading
						>
							{video.title}
						</Heading>
						<div className='text-gray-400'>{video.viewsCount.toLocaleString('ru-RU')} views</div>
					</div>
					<VideoActions video={video} />
				</div>
				<VideoChannel channel={video.channel} />
				<VideoDescription description={video.description} />
				{/* Comments */}
			</div>
			{!!video.similarVideos.length && <SimilarVideos videos={video.similarVideos} />}
		</section>
	)
}
