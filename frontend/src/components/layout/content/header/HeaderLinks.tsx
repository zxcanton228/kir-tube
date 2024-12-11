import { Bell, LayoutGrid, type LucideIcon, PlusSquare } from 'lucide-react'
import Link from 'next/link'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

const links: { href: string; Icon: LucideIcon }[] = [
	{
		href: STUDIO_PAGE.HOME,
		Icon: LayoutGrid
	},
	{
		href: STUDIO_PAGE.HOME,
		Icon: Bell
	},
	{
		href: STUDIO_PAGE.UPLOAD_VIDEO,
		Icon: PlusSquare
	}
]

export const HeaderLinks = () => {
	return (
		<nav className='flex items-center gap-5'>
			{links.map(({ href, Icon }, i) => (
				<Link
					href={href}
					key={i}
					className='transition-opacity hover:opacity-100 opacity-50'
				>
					<Icon />
				</Link>
			))}
		</nav>
	)
}
