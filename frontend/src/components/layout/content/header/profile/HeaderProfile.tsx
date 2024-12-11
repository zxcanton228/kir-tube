import { LogIn } from 'lucide-react'
import { useTypedSelector } from 'src/store'

import { PAGE } from 'src/config/public-page.config'

import { LinkButton } from 'ui/button/LinkButton'

import { HeaderAvatar } from './HeaderAvatar'

export function HeaderProfile() {
	const isLoggedIn = useTypedSelector(s => s.auth.isLoggedIn)
	return isLoggedIn ? (
		<HeaderAvatar />
	) : (
		<LinkButton href={PAGE.AUTH}>
			<LogIn size={20} />
			Auth
		</LinkButton>
	)
}
