import { Flame } from 'lucide-react'
import type { Metadata } from 'next'
import { videoService } from 'src/services/video.service'

import { PAGE } from 'src/config/public-page.config'

import { Heading } from 'ui/Heading'
import { VideoItem } from 'ui/video-item/VideoItem'

import { ExploreSection } from './explore/ExploreSection'

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
		type: 'website'
	}
}

export default async function Home() {
	const videos = (await videoService.getTrendingVideos()).data

	return (
		<section>
			{!!videos.length && (
				<section className='mb-10'>
					<Heading Icon={Flame}>Trending</Heading>
					<div className='grid-6-cols'>
						{videos.map(video => (
							<VideoItem
								key={video.id}
								video={video}
								Icon={Flame}
							/>
						))}
					</div>
				</section>
			)}
			<ExploreSection />
		</section>
	)
}
