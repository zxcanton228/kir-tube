import type { Metadata } from 'next'
import Image from 'next/image'
import channelService from 'src/services/channel.service'
import type { TPageSlugProp } from 'src/types/page.types'

import { SubscribeButton } from 'src/components/SubscribeButton'

import { PAGE } from 'src/config/public-page.config'

import { transformCount } from 'src/utils/transform-count'

import { VerifiedBadge } from 'ui/VerifiedBadge'
import { Heading } from 'ui/heading/Heading'

import { ChannelVideos } from './ChannelVideos'

export const revalidate = 100

export async function generateMetadata({ params }: TPageSlugProp): Promise<Metadata> {
	const { slug } = await params
	const { data: channel } = await channelService.bySlug(slug)
	return {
		title: channel.user.name,
		description: channel.description,
		alternates: { canonical: PAGE.CHANNEL(channel.id) },
		openGraph: {
			description: channel.description,
			url: PAGE.CHANNEL(channel.id),
			images: [channel.avatarUrl],
			title: channel.user.name,
			type: 'profile'
		}
	}
}

export async function generateStaticParams() {
	const { data: channels } = await channelService.getAll()

	return channels.map(({ slug }) => ({
		slug
	}))
}

export default async function ChannelPage({ params }: TPageSlugProp) {
	const { slug } = await params
	const { data: channel } = await channelService.bySlug(slug)

	return (
		<section>
			<div>
				<div className='relative w-full h-[250px] rounded-3xl overflow-hidden'>
					{!!channel.bannerUrl ? (
						<Image
							alt={channel.user.name || ''}
							className='object-cover'
							src={channel.bannerUrl}
							quality={100}
							priority
							fill
						/>
					) : (
						<div className='bg-border w-full h-full' />
					)}
				</div>
				<div className='flex items-start gap-5 mt-7 mb-10 w-3/4'>
					<Image
						src={channel.avatarUrl || '/images/avatar.png'}
						className='rounded-xl flex-shrink-0'
						alt={channel.slug}
						quality={100}
						height={162}
						width={162}
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
