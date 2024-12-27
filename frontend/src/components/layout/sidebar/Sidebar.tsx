import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

import { SkeletonLoader } from 'ui/SkeletonLoader'

import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA, STUDIO_SIDEBAR_DATA } from './sidebar.data'

const DynamicLogout = dynamic(() => import('./Logout').then(mod => mod.Logout), {
	ssr: false,
	loading: () => <SkeletonLoader className='w-5/6 h-10 mt-2' />
})

export const Sidebar = ({ toggleSidebar, isShowedSidebar }: { toggleSidebar: () => void; isShowedSidebar: boolean }) => {
	const pathname = usePathname()

	return (
		<aside className='relative z-[1] p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu
				menu={SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
			/>
			{pathname.includes(STUDIO_PAGE.HOME) && (
				<>
					<SidebarMenu
						title='Studio'
						isShowedSidebar={isShowedSidebar}
						menu={STUDIO_SIDEBAR_DATA}
					/>
					<span className='h-[1px] bg-border my-5 w-full block' />
				</>
			)}
			<SidebarMenu
				title='More from Youtube'
				isShowedSidebar={isShowedSidebar}
				menu={MORE_SIDEBAR_DATA}
			/>
			<DynamicLogout />
		</aside>
	)
}
