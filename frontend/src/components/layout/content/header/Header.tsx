import dynamic from 'next/dynamic'

import { SkeletonLoader } from 'ui/SkeletonLoader'

import { HeaderLinks } from './HeaderLinks'
import { SearchField } from './SearchField'

const DynamicHeaderProfile = dynamic(() => import('./profile/HeaderProfile').then(mod => mod.HeaderProfile), {
	ssr: false,
	loading: () => <SkeletonLoader className='w-10 mb-0 rounded-md' />
})
export const Header = () => (
	<header className='relative z-[1] p-layout border-b border-border flex items-center justify-between'>
		<SearchField />
		<div className='flex items-center gap-8'>
			<HeaderLinks />

			<DynamicHeaderProfile />
		</div>
	</header>
)
