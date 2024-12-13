import { PAGE } from 'src/config/public-page.config'

import { useProfile } from 'src/hooks/useProfile'

import { MenuItem } from './MenuItem'
import type { IMenuItemProps } from './menu.types'

export function MyChannelMenuItem({ item, ...props }: IMenuItemProps) {
	const { profile } = useProfile()

	const myChannelLink = profile?.channel?.slug ? PAGE.CHANNEL(profile?.channel?.slug) : null

	if (!myChannelLink) return null

	return (
		<MenuItem
			item={{
				...item,
				link: myChannelLink
			}}
			{...props}
		/>
	)
}
