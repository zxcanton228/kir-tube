import type { Metadata } from 'next'

import { PAGE } from 'src/config/public-page.config'

export const metadata: Metadata = {
	title: 'Feedback',
	description: 'Page description',
	alternates: {
		canonical: PAGE.FEEDBACK
	},
	openGraph: {
		title: 'Feedback',
		description: '',
		type: 'website'
	}
}
export default function Page() {
	return <div>Feedback</div>
}
