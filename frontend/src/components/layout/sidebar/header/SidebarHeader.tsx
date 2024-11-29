import { Menu, SquarePlay } from 'lucide-react'
import Link from 'next/link'

import { COLORS } from 'src/constants/colors.constants'

import { PUBLIC_PAGE } from 'src/config/public-page.config'

export const SidebarHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
	<div className='flex items-center gap-5 mb-12'>
		<button
			onClick={toggleSidebar}
			className='opacity-85 hover:opacity-100 transition-opacity'
		>
			<Menu />
		</button>
		<Link
			href={PUBLIC_PAGE.HOME}
			className='flex items-center gap-1.5'
		>
			<SquarePlay
				color={COLORS.primary}
				size={29}
			/>
			<span className='font-medium text-xl'>KIR Video</span>
		</Link>
	</div>
)
