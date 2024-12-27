import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import type { IVideo } from 'src/types/video.types'

import { PAGE } from 'src/config/public-page.config'

import { transformCount } from 'src/utils/transform-count'
import { transformDate } from 'src/utils/transform-date'

import { VideoChannelName } from './VideoChannelName'
import { VideoItemTitle } from './VideoItemTitle'

type Props = {
	video: IVideo
}

export const HorizontalVideoItem: FC<Props> = ({ video }) => (
	<m.article
		whileHover={{
			scale: 1.01,
			y: -5
		}}
		transition={{
			// пружина
			type: 'spring',
			// жесткость
			stiffness: 500,
			// демпфирование
			damping: 30
		}}
	>
		<div className='flex items-stretch gap-4 '>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				className='flex-shrink-0'
			>
				<Image
					src={video.thumbnailUrl}
					width={206}
					height={116}
					alt={video.title}
					className='rounded-md'
					quality={60}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</Link>
			<div className='flex flex-col justify-between'>
				<div>
					<div className='mb-1 text-lg'>
						<VideoItemTitle
							publicId={video.publicId}
							title={video.title}
						/>
					</div>
					<div className='mb-1'>
						<VideoChannelName
							channel={video.channel}
							spanClassName='text-base mr-0.5'
						/>
					</div>
				</div>
				<div className='flex items-center gap-2 pb-1'>
					<span className='text-gray-400 text-lg'>{transformCount(video.viewsCount)} views</span>
					<span>•</span>
					<span className='text-gray-400'>{transformDate(video.createdAt)}</span>
				</div>
			</div>
		</div>
	</m.article>
)
