'use client'

import { Compass } from 'lucide-react'
import dynamic from 'next/dynamic'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Heading } from 'ui/heading/Heading'

const DynamicExplore = dynamic(() => import('./Explore').then(mod => mod.Explore), {
	ssr: false,
	loading: () => (
		<div className='videos-grid'>
			<SkeletonLoader
				count={6}
				className='h-36 rounded-md'
			/>
		</div>
	)
})

export const ExploreSection = () => (
	<section className='pb-5'>
		<Heading Icon={Compass}>Explore</Heading>
		<DynamicExplore />
	</section>
)
