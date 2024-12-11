import type { Metadata } from 'next'

import { PAGE } from 'src/config/public-page.config'

export const metadata: Metadata = {
	title: 'Liked Videos',
	description: 'Page description',
	alternates: {
		canonical: PAGE.LIKED_VIDEOS
	},
	openGraph: {
		title: 'Liked Videos',
		description: '',
		type: 'website'
	}
}
export default function Page() {
	return <div>Liked Videos</div>
}
