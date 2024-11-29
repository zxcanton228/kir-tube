import { SidebarHeader } from './header/SidebarHeader'
import { SidebarMenu } from './menus/SidebarMenu'
import { SidebarSubscriptions } from './menus/subscribtions/SidebarSubscriptions'
import { MORE_SIDEBAR_DATA, SIDEBAR_DATA } from './sidebar.data'

export const Sidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
	return (
		<aside className='p-layout border-r border-border whitespace-nowrap overflow-hidden'>
			<SidebarHeader toggleSidebar={toggleSidebar} />
			<SidebarMenu menu={SIDEBAR_DATA} />
			<SidebarSubscriptions />
			<SidebarMenu
				title='More from Youtube'
				menu={MORE_SIDEBAR_DATA}
			/>
		</aside>
	)
}
