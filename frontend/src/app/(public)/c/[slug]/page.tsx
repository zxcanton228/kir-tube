import type { Metadata } from 'next'
import Image from 'next/image'
import channelService from 'src/services/channel.service'

import { SubscribeButton } from 'src/components/SubscribeButton'

import { SITE_URL } from 'src/constants/constants'

import { transformCount } from 'src/utils/transform-count'

import { Heading } from 'ui/Heading'
import { VerifiedBadge } from 'ui/VerifiedBadge'

import { ChannelVideos } from './ChannelVideos'

// const DynamicSubscribeButton = d(() => import('src/components/SubscribeButton').then(mod => mod.SubscribeButton), {
// 	ssr: false,
// 	loading: () => (
// 		<div className='grid grid-cols-6 gap-6'>
// 			<SkeletonLoader
// 				count={1}
// 				className='w-36 h-11  rounded-md'
// 			/>
// 		</div>
// 	)
// })

export const revalidate = 100
export const dynamic = 'force-static'

export async function generateMetadata({ params }: any): Promise<Metadata> {
	const { slug } = await params
	const { data: channel } = await channelService.bySlug(slug)
	return {
		title: channel.user.name,
		description: channel.description,
		openGraph: {
			type: 'profile',
			title: channel.user.name,
			description: channel.description,
			images: [channel.avatarUrl],
			url: `${SITE_URL}/c/${channel.slug}`
		}
	}
}

export async function generateStaticParams() {
	const { data: channels } = await channelService.getAll()

	return channels.map(({ slug }) => ({
		slug
	}))
}

export default async function ChannelPage({ params }: any) {
	const { slug } = await params
	const { data: channel } = await channelService.bySlug(slug)

	return (
		<section>
			<div>
				<div className='relative w-full h-[250px] rounded-3xl overflow-hidden'>
					<Image
						alt={channel.user.name || ''}
						src={channel.bannerUrl}
						layout='fill'
						style={{ objectFit: 'cover' }}
						quality={100}
						priority
					/>
				</div>
				<div className='flex items-start gap-5 mt-7 mb-10 w-3/4'>
					<Image
						alt={channel.slug}
						src={channel.avatarUrl}
						width={162}
						height={162}
						className='rounded-xl flex-shrink-0'
						quality={100}
						priority
					/>
					<div>
						<Heading
							className='mb-2 '
							isPageHeading
						>
							<span className='flex items-center gap-2'>
								{channel.user.name} {channel.isVerified && <VerifiedBadge size={18} />}
							</span>
						</Heading>
						<div className='mb-2 text-gray-400 text-[0.9rem] flex items-center gap-1'>
							<span>@{channel.slug}</span>
							<span>•</span>
							<span>{transformCount(channel.subscribers.length)} subscribes</span>
							<span>•</span>
							<span>{transformCount(channel.videos.length)} videos</span>
						</div>
						<section className='mb-2 text-gray-400 text-sm leading-snug'>
							<p>{channel.description}</p>
						</section>
						<div>
							<SubscribeButton slug={slug} />
						</div>
					</div>
				</div>
			</div>
			{channel.videos.length === 0 ? <p>No videos...</p> : <ChannelVideos videos={channel.videos} />}
		</section>
	)
}
