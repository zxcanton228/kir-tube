import type { ISidebarItem } from '../sidebar.types'

import { MenuItem } from './MenuItem'

interface Props {
	title?: string
	menu: ISidebarItem[]
}

export const SidebarMenu = ({ menu, title }: Props) => {
	return (
		<nav>
			{title && <h4 className='opacity-45 uppercase text-xs mb-3 font-medium'>{title}</h4>}
			<ul>
				{menu.map(item => (
					<MenuItem
						key={item.label}
						item={item}
					/>
				))}
			</ul>
		</nav>
	)
}
