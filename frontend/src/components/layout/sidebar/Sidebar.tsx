import dynamic from 'next/dynamic'

import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscriptions } from './menus/subscribtions/SidebarSubscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

const DynamicLogout = dynamic(() => import('./Logout').then(mod => mod.Logout), { ssr: false })

export const Sidebar = ({ toggleSidebar, isShowedSidebar }: { toggleSidebar: () => void; isShowedSidebar: boolean }) => {
	return (
		<aside className='p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu
				menu={SIDEBAR_DATA}
				isShowedSidebar={isShowedSidebar}
			/>
			<SidebarSubscriptions />
			<SidebarMenu
				title='More from Youtube'
				isShowedSidebar={isShowedSidebar}
				menu={MORE_SIDEBAR_DATA}
			/>
			<DynamicLogout />
		</aside>
	)
}
