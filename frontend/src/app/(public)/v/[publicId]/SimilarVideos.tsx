import { Flame } from 'lucide-react'
import type { ISingleVideoResponse } from 'src/types/video.types'

import { VideoItem } from 'ui/video-item/VideoItem'

export const SimilarVideos = ({ videos }: { videos: ISingleVideoResponse['similarVideos'] }) => {
	return (
		<div className='grid grid-cols-1 gap-8'>
			{videos.map(video => (
				<VideoItem
					key={video.id}
					video={video}
					Icon={Flame}
				/>
			))}
		</div>
	)
}
