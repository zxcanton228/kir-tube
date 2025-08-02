import type { Metadata } from 'next'
import { videoService } from 'src/services/video.service'
import type { TPagePublicIdProp } from 'src/types/page.types'

import { PAGE } from 'src/config/public-page.config'

import { stripHtml } from 'src/utils/strip-html'

import { SingleVideo } from './SingleVideo'

// const SubscribeButton = dynamicNext(() => import('src/components/SubscribeButton').then(mod => mod.SubscribeButton), {
// 	ssr: false,
// 	loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' />
// })

export const revalidate = 100

export async function generateMetadata({ params }: TPagePublicIdProp): Promise<Metadata> {
	const { publicId } = await params
	const data = await videoService.byPublicId(publicId)
	const video = data.data

	return {
		title: video.title,
		description: stripHtml(video.description).slice(0, 150),
		alternates: {
			canonical: PAGE.VIDEO(video.id)
		},
		openGraph: {
			type: 'video.other',
			images: [video.thumbnailUrl],
			url: PAGE.VIDEO(video.id),
			videos: video.videoFileName
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

export default async function VideoPage({ params }: TPagePublicIdProp) {
	const { publicId } = await params
	const { data: video } = await videoService.byPublicId(publicId)
	return <SingleVideo video={video} />
}
