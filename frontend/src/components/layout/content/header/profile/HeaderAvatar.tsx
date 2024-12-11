import Image from 'next/image'
import Link from 'next/link'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

import { useProfile } from 'src/hooks/useProfile'

import { SkeletonLoader } from 'ui/SkeletonLoader'

export const HeaderAvatar = () => {
	const { isLoading, profile } = useProfile()
	if (isLoading) return <SkeletonLoader className='w-10 mb-0 rounded-md' />
	return (
		<div className='relative'>
			<Link
				href={STUDIO_PAGE.SETTINGS}
				className='shrink-0'
			>
				<Image
					alt='Profile avatar'
					width={40}
					height={40}
					src={profile?.channel?.avatarUrl || '/avatar.png'}
					className='rounded-lg'
					quality={75}
				/>
			</Link>
			{!profile?.verificationToken && (
				<div className='absolute -left-4 -bottom-3.5 bg-primary rounded-sm p-0.5 w-max text-xs'>Not verified</div>
			)}
		</div>
	)
}
