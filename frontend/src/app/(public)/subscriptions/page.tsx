import type { Metadata } from 'next'

import { PAGE } from 'src/config/public-page.config'

export const metadata: Metadata = {
	title: 'Subscriptions',
	description: 'Page description',
	alternates: {
		canonical: PAGE.SUBSCRIPTIONS
	},
	openGraph: {
		title: 'Subscriptions',
		description: '',
		type: 'website'
	}
}
export default function Page() {
	return <div>Subscriptions</div>
}
