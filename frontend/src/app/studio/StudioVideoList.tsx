'use client'

import { Video } from 'lucide-react'
import dynamic from 'next/dynamic'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Heading } from 'ui/heading/Heading'

const DynamicExplore = dynamic(() => import('./StudioVideoListSection').then(mod => mod.StudioVideoListSection), {
	ssr: false,
	loading: () => (
		<div className='flex flex-col gap-2'>
			<SkeletonLoader
				count={5}
				className='h-28 rounded-md'
			/>
		</div>
	)
})

export const StudioVideoList = () => (
	<section className='pb-5'>
		<Heading
			Icon={Video}
			isPageHeading
		>
			My content
		</Heading>
		<DynamicExplore />
	</section>
)
