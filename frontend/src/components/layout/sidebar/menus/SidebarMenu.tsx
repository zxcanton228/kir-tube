'use client'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'
import { useTypedSelector } from 'src/store'

import { PAGE } from 'src/config/public-page.config'

import type { ISidebarItem } from '../sidebar.types'

import { MenuItem } from './MenuItem'
import { MyChannelMenuItem } from './MyChannelMenuItem'

interface Props {
	title?: string
	menu: ISidebarItem[]
	isShowedSidebar: boolean
}

export function SidebarMenu({ menu, title, isShowedSidebar }: Props) {
	const pathname = usePathname()
	const { isLoggedIn } = useTypedSelector(state => state.auth)

	return (
		<nav>
			{title && <div className='opacity-70 uppercase font-medium text-xs mb-3'>{title}</div>}
			<ul className='sidebar-menu-ul'>
				{menu.map(menuItem => {
					const props = {
						item: menuItem,
						isActive: !!match(menuItem.link)(pathname),
						isShowedSidebar
					}

					const isMyChannel = menuItem.link === PAGE.MY_CHANNEL
					const isMyChannelItem = isMyChannel && isLoggedIn

					return isMyChannelItem ? (
						<MyChannelMenuItem
							key={menuItem.label}
							{...props}
						/>
					) : isMyChannel ? null : (
						<MenuItem
							key={menuItem.label}
							{...props}
						/>
					)
				})}
			</ul>
		</nav>
	)
}
