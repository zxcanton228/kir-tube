import type { Metadata } from 'next'

import { PAGE } from 'src/config/public-page.config'

export const metadata: Metadata = {
	title: 'History',
	description: 'Page description',
	alternates: {
		canonical: PAGE.HISTORY
	},
	openGraph: {
		title: 'History',
		description: '',
		type: 'website'
	}
}
export default function Page() {
	return <div>History</div>
}
