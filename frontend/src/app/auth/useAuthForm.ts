import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useRef, useTransition } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import type { SubmitHandler, UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'
import { authService } from 'src/services/auth.service'

import { PAGE } from 'src/config/public-page.config'

import type { IAuthData, IAuthForm } from './auth-form.types'

export function useAuthForm(type: 'login' | 'register', reset: UseFormReset<IAuthForm>) {
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const { mutateAsync, isPending: isAuthPending } = useMutation({
		mutationKey: [type],
		mutationFn: (data: IAuthData) => authService.main(type, data, recaptchaRef.current?.getValue())
	})

	const onSubmit: SubmitHandler<IAuthForm> = ({ email, password }) => {
		const token = recaptchaRef.current?.getValue()
		if (!token) {
			toast.error('Please, complete the captcha', { id: 'recaptcha' })
			return
		}
		toast.promise(mutateAsync({ email, password }), {
			loading: 'Loading...',
			success: () => {
				startTransition(() => {
					reset()
					router.push(PAGE.HOME)
				})
				return 'Success login!'
			},
			error: e => {
				if (axios.isAxiosError(e)) {
					return e.response?.data.message
				}
			}
		})
	}

	const isLoading = isPending || isAuthPending
	return { onSubmit, isLoading, recaptchaRef }
}
