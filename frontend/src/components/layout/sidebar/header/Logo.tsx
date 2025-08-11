import { SquarePlay } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC, memo } from 'react'

import { COLORS } from 'src/constants/colors.constants'
import { SITE_NAME } from 'src/constants/seo.constants'

import { PAGE } from 'src/config/public-page.config'
import { STUDIO_PAGE } from 'src/config/studio-page.config'

export const Logo: FC = memo(() => {
	const pathname = usePathname()
	const Tag = pathname === PAGE.HOME ? 'h1' : 'span'
	return (
		<Link
			href={PAGE.HOME}
			className='inline-flex items-center gap-1.5 logo'
		>
			<SquarePlay
				color={COLORS.primary}
				size={29}
			/>
			<Tag className='font-medium text-xl'>{pathname.includes(STUDIO_PAGE.HOME) ? 'Studio' : SITE_NAME}</Tag>
		</Link>
	)
})
Logo.displayName = 'Logo'
