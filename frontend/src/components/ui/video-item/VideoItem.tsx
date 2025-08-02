import * as m from 'framer-motion/m'
import { type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import type { IVideo } from 'src/types/video.types'

import { PAGE } from 'src/config/public-page.config'

import { transformCount } from 'src/utils/transform-count'
import { transformDate } from 'src/utils/transform-date'

import { VideoChannelName } from './VideoChannelName'
import { VideoItemTitle } from './VideoItemTitle'

import './VideoItem.scss'

interface Props {
	isImagePriority?: boolean
	Icon?: LucideIcon
	video: IVideo
}

export const VideoItem: FC<Props> = ({ video, Icon, isImagePriority = false }) => (
	<m.article
		whileHover={{ scale: 1.03, y: -5 }}
		transition={{ types: 'spring', stiffness: 500, damping: 30 }}
		className='video-item'
	>
		<div className='relative mb-1.5 w-full'>
			<Link href={PAGE.VIDEO(video.publicId)}>
				<Image
					className='rounded-md w-full video-thumbnail'
					src={video.thumbnailUrl}
					alt={video.title}
					width={306}
					height={172}
					quality={60}
				/>
			</Link>
			<Link
				href={PAGE.CHANNEL(video.channel?.slug) || ''}
				className='absolute bottom-2 left-2'
			>
				<Image
					className='rounded-full shadow video-avatar shadow-black'
					src={video.channel.avatarUrl}
					alt={video.channel.user.name}
					priority={isImagePriority}
					quality={60}
					height={35}
					width={35}
				/>
			</Link>
		</div>
		<div className='mb-1.5 flex items-center justify-between'>
			<div className='flex items-center gap-0.5'>
				{Icon && (
					<Icon
						className='text-red-600'
						size={20}
					/>
				)}
				<span className='text-gray-400 text-sm'>{transformCount(video.viewsCount)} views</span>
			</div>
			<div>
				<span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
			</div>
		</div>
		<div className='mb-1'>
			<VideoItemTitle
				publicId={video.publicId}
				title={video.title}
			/>
		</div>
		<div>
			<VideoChannelName channel={video.channel} />
		</div>
	</m.article>
)
