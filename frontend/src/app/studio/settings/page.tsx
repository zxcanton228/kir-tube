import { Settings } from 'lucide-react'
import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from 'src/constants/seo.constants'

import { Heading } from 'ui/heading/Heading'

import { SettingsForm } from './SettingsForm'

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
}

export default function SettingsPage() {
	return (
		<div>
			<Heading
				Icon={Settings}
				isPageHeading
			>
				Settings
			</Heading>
			<SettingsForm />
		</div>
	)
}
