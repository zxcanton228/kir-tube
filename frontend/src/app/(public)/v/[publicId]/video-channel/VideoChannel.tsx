'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import type { IChannel } from 'src/types/channel.types'

import { PAGE } from 'src/config/public-page.config'

import { transformCount } from 'src/utils/transform-count'

import { Heading } from 'ui/Heading'
import { SkeletonLoader } from 'ui/SkeletonLoader'
import { VerifiedBadge } from 'ui/VerifiedBadge'

const DynamicSubscribeButton = dynamic(() => import('src/components/SubscribeButton').then(mod => mod.SubscribeButton), {
	ssr: false,
	loading: () => <SkeletonLoader className='w-44 h-10 rounded-md' />
})

export const VideoChannel: FC<{ channel: IChannel }> = ({ channel }) => {
	return (
		<div className='flex items-center justify-between my-6 '>
			<div className='flex gap-2.5 items-center'>
				<Link href={PAGE.CHANNEL(channel.slug)}>
					<Image
						alt={channel.user.name || ''}
						src={channel.avatarUrl}
						width={55}
						height={55}
						quality={50}
						className='rounded flex-shrink-0 shadow'
						priority
					/>
				</Link>
				<div>
					<Link href={PAGE.CHANNEL(channel.slug)}>
						<Heading
							className='mb-0'
							classNameHeading='text-lg'
						>
							<span className='flex items-center gap-2'>
								{channel.user.name}
								{channel.isVerified && <VerifiedBadge size={14} />}
							</span>
						</Heading>

						<div className='mb-2 text-gray-400 text-sm flex items-center gap-1'>
							{transformCount(channel.subscribers.length)} subscribers
						</div>
					</Link>
				</div>
			</div>
			<DynamicSubscribeButton slug={channel.slug} />
		</div>
	)
}
