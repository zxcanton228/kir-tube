import { Flame } from 'lucide-react'
import type { Metadata } from 'next'
import { videoService } from 'src/services/video.service'

import { PAGE } from 'src/config/public-page.config'

import { Heading } from 'ui/heading/Heading'
import { VideoItem } from 'ui/video-item/VideoItem'

export const revalidate = 100

export const metadata: Metadata = {
	title: 'Home',
	description: 'Home',
	alternates: {
		canonical: PAGE.HOME
	},
	openGraph: {
		title: 'Home',
		description: 'Home',
		type: 'video.other'
	}
}

export default async function PageTrending() {
	const videos = (await videoService.getTrendingVideos()).data

	return (
		<section>
			<Heading Icon={Flame}>Trending</Heading>
			<div className='videos-grid'>
				{!!videos.length ? (
					videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
							Icon={Flame}
						/>
					))
				) : (
					<div>Trends are temporarily unavailable</div>
				)}
			</div>
		</section>
	)
}
