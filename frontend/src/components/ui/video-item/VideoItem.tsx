import * as m from 'framer-motion/m'
import { BadgeCheck, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { IVideo } from 'src/types/video.types'

import { PAGE } from 'src/config/public-page.config'

import { transformDate } from 'src/utils/transform-date'
import { transformViews } from 'src/utils/transform-views'

interface Props {
	video: IVideo
	Icon?: LucideIcon
}

export const VideoItem = ({ video, Icon }: Props) => {
	return (
		<m.article
			whileHover={{ scale: 1.03, y: -5 }}
			transition={{ types: 'spring', stiffness: 500, damping: 30 }}
		>
			<div className='relative mb-1.5'>
				<Link href={PAGE.VIDEO(video.id)}>
					<Image
						src={video.thumbnailUrl}
						alt={video.title}
						width={250}
						height={140}
						quality={65}
						className='rounded-md'
					/>
				</Link>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					className='absolute bottom-2 left-2'
				>
					<Image
						src={video.channel.avatarUrl}
						alt={video.channel.user.name}
						width={35}
						height={35}
						quality={60}
						className='rounded-full shadow'
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
					<span className='text-gray-400 text-sm'>{transformViews(video.viewsCount)}</span>
				</div>
				<div>
					<span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
				</div>
			</div>
			<div className='mb-1'>
				<Link
					href={PAGE.VIDEO(video.id)}
					className='line-clamp-2 leading-[1.3]'
				>
					<h3 title={video.title}>{video.title}</h3>
				</Link>
			</div>
			<div>
				<Link
					href={PAGE.CHANNEL(video.channel.slug)}
					className='flex items-center gap-1'
				>
					<span className='text-gray-400 text-sm'>{video.channel.user.name}</span>
					{video.channel.isVerified && (
						<span>
							<BadgeCheck
								className='text-green-500'
								size={15}
							/>
						</span>
					)}
				</Link>
			</div>
		</m.article>
	)
}
