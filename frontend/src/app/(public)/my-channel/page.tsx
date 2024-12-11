import type { Metadata } from 'next'

import { PAGE } from 'src/config/public-page.config'

export const metadata: Metadata = {
	title: 'My channel',
	description: 'Page description',
	alternates: {
		canonical: PAGE.MY_CHANNEL
	},
	openGraph: {
		title: 'My channel',
		description: '',
		type: 'website'
	}
}
export default function Page() {
	return <div>My channel</div>
}
