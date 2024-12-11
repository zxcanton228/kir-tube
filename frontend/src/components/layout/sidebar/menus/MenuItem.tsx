import cn from 'clsx'
import Link from 'next/link'

import type { ISidebarItem } from '../sidebar.types'

type Props = {
	item: ISidebarItem
	isActive: boolean
	isShowedSidebar: boolean
}
export const MenuItem = ({ item, isActive, isShowedSidebar }: Props) => (
	<li>
		<Link
			href={item.link}
			className='group py-3 flex items-center gap-5 '
		>
			<item.icon
				className={cn('min-w-6 ', {
					'group-hover:text-primary transition group-hover:rotate-6': !isActive && isShowedSidebar,
					'text-red-400': isActive && !isShowedSidebar
				})}
			/>
			<span className={cn('border-b', { 'border-white': isActive, 'border-transparent': !isActive })}>{item.label}</span>
		</Link>
		{item.isBottomBorder && <span className='bg-border h-[1px] my-5 w-full block'></span>}
	</li>
)
