'use client'

import { useSettings } from './useSettings'

export function SettingsForm() {
	// eslint-disable-next-line
	const { form, isLoading, onSubmit } = useSettings()

	return <div>SettingsForm</div>
}
