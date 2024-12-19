import { Bell, LayoutGrid, type LucideIcon, PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

const links: { href: string; Icon: LucideIcon; label: string }[] = [
	{
		href: STUDIO_PAGE.HOME,
		Icon: LayoutGrid,
		label: 'Studio'
	},
	{
		href: STUDIO_PAGE.HOME,
		Icon: Bell,
		label: 'Notifications'
	},
	{
		href: STUDIO_PAGE.UPLOAD_VIDEO,
		Icon: PlusSquare,
		label: 'Upload video'
	}
]

export const HeaderLinks = () => {
	return (
		<nav className='flex items-center gap-5'>
			{links.map(({ href, Icon, label }) => (
				<Link
					href={href}
					title={label}
					key={label}
					className='transition-opacity hover:opacity-100 opacity-50'
				>
					<Icon />
				</Link>
			))}
		</nav>
	)
}
