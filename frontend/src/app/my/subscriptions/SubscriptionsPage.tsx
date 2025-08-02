'use client'

import { CalendarCheck } from 'lucide-react'

import { useProfile } from 'src/hooks/useProfile'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Heading } from 'ui/heading/Heading'
import { VideoItem } from 'ui/video-item/VideoItem'

export function SubscriptionsPage() {
	const { profile, isLoading } = useProfile()

	return (
		<section>
			<Heading
				isPageHeading
				Icon={CalendarCheck}
			>
				Subscriptions
			</Heading>
			<div className='grid grid-cols-6 gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				) : profile?.subscribedVideos?.length ? (
					profile?.subscribedVideos?.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>You have not subscribed to anyone yet, or they have not posted a single video.</p>
				)}
			</div>
		</section>
	)
}
