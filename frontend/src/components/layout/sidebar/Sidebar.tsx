import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

import { SkeletonLoader } from 'ui/SkeletonLoader'

import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA, STUDIO_SIDEBAR_DATA } from './sidebar.data'

const DynamicLogout = dynamic(() => import('./Logout').then(mod => mod.Logout), {
	ssr: false,
	loading: () => <SkeletonLoader className='w-5/6 h-10 mt-2' />
})

type Props = { toggleSidebar: () => void; isShowedSidebar: boolean }

export const Sidebar: FC<Props> = ({ toggleSidebar, isShowedSidebar }) => {
	const pathname = usePathname()

	return (
		<aside className={'relative z-[1] p-layout border-r border-border whitespace-nowrap overflow-hidden sidebar'}>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu
				isShowedSidebar={isShowedSidebar}
				menu={SIDEBAR_DATA}
			/>
			{pathname.includes(STUDIO_PAGE.HOME) && (
				<>
					<SidebarMenu
						isShowedSidebar={isShowedSidebar}
						menu={STUDIO_SIDEBAR_DATA}
						title='Studio'
					/>
					<span className='h-[1px] bg-border my-5 w-full block' />
				</>
			)}
			<SidebarMenu
				isShowedSidebar={isShowedSidebar}
				title='More from Youtube'
				menu={MORE_SIDEBAR_DATA}
			/>
			<DynamicLogout />
		</aside>
	)
}
