import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { authService } from 'src/services/auth.service'
import { useTypedSelector } from 'src/store'

export function Logout() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout()
	})

	const { isLoggedIn } = useTypedSelector(state => state.auth)

	if (!isLoggedIn) return null

	return (
		<button
			onClick={() => mutate()}
			className={'group py-3 flex items-center gap-5 text-gray-300'}
		>
			<LogOut className={'min-w-6 group-hover:text-primary transition group-hover:rotate-6'} />
			<span>{isPending ? 'Please wait...' : 'Logout'}</span>
		</button>
	)
}
