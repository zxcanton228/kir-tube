import {
	CircleAlert,
	CirclePlay,
	Compass,
	Flame,
	FolderHeart,
	Gamepad2,
	History,
	LayoutGrid,
	ListVideo,
	Settings,
	TvMinimalPlay,
	Upload
} from 'lucide-react'

import { PAGE } from 'src/config/public-page.config'
import { STUDIO_PAGE } from 'src/config/studio-page.config'

import type { ISidebarItem } from './sidebar.types'

export const SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: Compass,
		label: 'Explore',
		link: PAGE.HOME
	},
	{
		icon: Flame,
		label: 'Trending',
		link: PAGE.TRENDING
	},
	{
		icon: Gamepad2,
		label: 'Video games',
		link: PAGE.VIDEO_GAMES
	},
	{
		icon: TvMinimalPlay,
		label: 'My channel',
		isBottomBorder: true,
		link: PAGE.MY_CHANNEL
	},
	{
		icon: CirclePlay,
		link: PAGE.SUBSCRIPTIONS,
		label: 'Subscriptions'
	},
	{
		icon: ListVideo,
		label: 'Playlists',
		link: PAGE.PLAYLISTS()
	},
	{
		icon: History,
		label: 'History',
		link: PAGE.HISTORY
	},
	{
		icon: FolderHeart,
		label: 'Liked videos',
		link: PAGE.LIKED_VIDEOS,
		isBottomBorder: true
	}
]
export const MORE_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: CircleAlert,
		label: 'Send feedback',
		link: PAGE.FEEDBACK
	}
]
export const STUDIO_SIDEBAR_DATA: ISidebarItem[] = [
	{
		icon: LayoutGrid,
		label: 'Studio',
		link: STUDIO_PAGE.HOME
	},
	{
		icon: Settings,
		label: 'Settings',
		link: STUDIO_PAGE.SETTINGS
	},
	{
		icon: Upload,
		label: 'Upload video',
		link: STUDIO_PAGE.UPLOAD_VIDEO
	}
]
