import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { userService } from 'src/services/user.service'

import { useProfile } from 'src/hooks/useProfile'

import type { ISettingsData } from './settings.types'

export function useSettings() {
	const form = useForm<ISettingsData>({
		mode: 'onChange'
	})

	const { profile, isSuccess, isLoading, refetch } = useProfile()

	useEffect(() => {
		if (!isSuccess) return
		const channel = profile?.channel
			? {
					avatarUrl: profile?.channel?.avatarUrl,
					bannerUrl: profile?.channel?.bannerUrl,
					description: profile?.channel?.description,
					slug: profile?.channel?.slug.toLowerCase().replace(/ /g, '-')
				}
			: {}

		form.reset({
			channel,
			email: profile?.email,
			name: profile?.name
		})
		// eslint-disable-next-line
	}, [isSuccess, profile])

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: ISettingsData) => userService.updateProfile(data),
		onSuccess: () => {
			toast.success('Profile updated successfully!')
			refetch()
		}
	})

	const onSubmit: SubmitHandler<ISettingsData> = data => {
		mutate(data)
	}

	return {
		onSubmit,
		formObject: form,
		isLoading: isPending,
		isProfileLoading: isLoading
	}
}
