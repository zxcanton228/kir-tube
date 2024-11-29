import Link from 'next/link'

import type { ISidebarItem } from '../sidebar.types'

type Props = {
	item: ISidebarItem
}
export const MenuItem = ({ item }: Props) => (
	<li>
		<Link
			href={item.link}
			className='group py-3 flex items-center gap-5 '
		>
			<item.icon className='group-hover:text-primary transition group-hover:rotate-6 min-w-6' />
			<span>{item.label}</span>
		</Link>
		{item.isBottomBorder && <span className='bg-border h-[1px] my-5 w-full block'></span>}
	</li>
)
