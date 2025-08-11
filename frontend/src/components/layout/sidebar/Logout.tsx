import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { authService } from 'src/services/auth/auth.service'
import { useTypedSelector } from 'src/store'

import { PAGE } from 'src/config/public-page.config'
import { STUDIO_PAGE } from 'src/config/studio-page.config'

export function Logout() {
	const router = useRouter()
	const pathname = usePathname()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(STUDIO_PAGE.SETTINGS)) {
				router.push(PAGE.HOME)
			}
		}
	})

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	if (!isLoggedIn) return null

	return (
		<button
			title='Logout'
			onClick={() => mutate()}
			className={'group py-3 flex items-center gap-5 text-gray-300'}
		>
			<LogOut className={'min-w-6 group-hover:text-primary transition group-hover:rotate-6'} />
			<span>{isPending ? 'Please wait...' : 'Logout'}</span>
		</button>
	)
}
