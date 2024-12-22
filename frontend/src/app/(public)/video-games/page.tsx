import { Gamepad2 } from 'lucide-react'
import type { Metadata } from 'next'
import { videoService } from 'src/services/video.service'

import { PAGE } from 'src/config/public-page.config'

import { Heading } from 'ui/Heading'
import { VideoItem } from 'ui/video-item/VideoItem'

export const revalidate = 100

export const metadata: Metadata = {
	title: 'Video Games',
	description: 'Video Games',
	alternates: {
		canonical: PAGE.VIDEO_GAMES
	},
	openGraph: {
		title: 'Video Games',
		description: 'Video Games',
		type: 'video.other'
	}
}

export default async function PageVideoGames() {
	const { videos } = (await videoService.getGamesVideos()).data

	return (
		<section>
			<Heading Icon={Gamepad2}>Video games</Heading>
			<div className='grid-6-cols'>
				{!!videos.length ? (
					videos.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<div className='w-100'>Video Games are temporarily unavailable</div>
				)}
			</div>
		</section>
	)
}
