import { Flame, Video } from 'lucide-react'
import type { IChannel } from 'src/types/channel.types'

import { Heading } from 'ui/Heading'
import { VideoItem } from 'ui/video-item/VideoItem'

export const ChannelVideos = ({ videos }: { videos: IChannel['videos'] }) => {
	return (
		<section className='mb-10'>
			<Heading Icon={Video}>Videos</Heading>
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
	)
}
