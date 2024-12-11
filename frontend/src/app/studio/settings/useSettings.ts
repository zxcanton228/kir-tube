import { useMutation } from '@tanstack/react-query'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { userService } from 'src/services/user.service'

import type { ISettingsData } from './settings.types'

export function useSettings() {
	const form = useForm<ISettingsData>({ mode: 'onChange' })

	const { mutate, isPending: isLoading } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: ISettingsData) => userService.updateProfile(data)
	})
	const onSubmit: SubmitHandler<ISettingsData> = data => {
		mutate(data)
	}

	return { form, isLoading, onSubmit }
}
