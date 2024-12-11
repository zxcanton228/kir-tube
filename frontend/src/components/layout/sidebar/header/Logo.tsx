import { SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from 'src/constants/colors.constants'

import { PAGE } from 'src/config/public-page.config'

export const Logo = () => {
	return (
		<Link
			href={PAGE.HOME}
			className='inline-flex items-center gap-1.5'
		>
			<SquarePlay
				color={COLORS.primary}
				size={29}
			/>
			<span className='font-medium text-xl'>KIR Video</span>
		</Link>
	)
}
