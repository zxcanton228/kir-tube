import type { LucideIcon } from 'lucide-react'

export interface ISidebarItem {
	icon: LucideIcon
	label: string
	link: string
	isBottomBorder?: boolean
}
export interface ISidebarSubItem extends Pick<ISidebarItem, 'label' | 'link'> {
	avatar: string
	isLiveNow?: boolean
	isRecentUpload?: boolean
}
