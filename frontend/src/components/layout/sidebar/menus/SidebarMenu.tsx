import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

import type { ISidebarItem } from '../sidebar.types'

import { MenuItem } from './MenuItem'

interface Props {
	title?: string
	isShowedSidebar: boolean
	menu: ISidebarItem[]
}

export const SidebarMenu = ({ menu, title, isShowedSidebar }: Props) => {
	const path = usePathname()
	return (
		<nav>
			{title && <h4 className='opacity-45 uppercase text-xs mb-3 font-medium'>{title}</h4>}
			<ul>
				{menu.map(item => (
					<MenuItem
						isShowedSidebar={isShowedSidebar}
						isActive={!!match(item.link)(path)}
						key={item.label}
						item={item}
					/>
				))}
			</ul>
		</nav>
	)
}
