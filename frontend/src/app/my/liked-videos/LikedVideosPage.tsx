'use client'

import { Heart } from 'lucide-react'

import { useProfile } from 'src/hooks/useProfile'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Heading } from 'ui/heading/Heading'
import { HorizontalVideoItem } from 'ui/video-item/HorizontalVideoItem'

export function LikedVideosPage() {
	const { profile, isLoading } = useProfile()

	return (
		<div className='w-1/2'>
			<section className='flex items-center justify-between mb-10'>
				<Heading
					isPageHeading
					Icon={Heart}
					className='m-0'
				>
					Liked videos
				</Heading>
				{!!profile?.likes.length && <span>Liked videos: {profile.likes.length}</span>}
			</section>
			<div className='flex flex-col gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-28 rounded-md'
					/>
				) : profile?.likes?.length ? (
					profile?.likes?.map(like => (
						<HorizontalVideoItem
							key={like.id}
							video={like.video}
						/>
					))
				) : (
					<p>You have not liked any videos.</p>
				)}
			</div>
		</div>
	)
}
