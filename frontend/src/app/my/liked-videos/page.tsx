import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from 'src/constants/seo.constants'

import { LPage } from './LPage'

export const metadata: Metadata = {
	title: 'Liked Videos',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <LPage />
}
