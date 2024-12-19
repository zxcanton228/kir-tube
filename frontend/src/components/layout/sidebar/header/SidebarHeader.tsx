import { Menu } from 'lucide-react'

import { Logo } from './Logo'

export const SidebarHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
	<div className='flex items-center gap-5 mb-12'>
		<button
			onClick={toggleSidebar}
			className='opacity-85 hover:opacity-100 transition-opacity'
			title='Toggle sidebar'
		>
			<Menu />
		</button>
		<Logo />
	</div>
)
