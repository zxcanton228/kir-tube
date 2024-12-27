import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from 'src/constants/seo.constants'

import { HPage } from './HPage'

export const metadata: Metadata = {
	title: 'History',
	...NO_INDEX_PAGE
}

export default function HistoryPage() {
	return <HPage />
}
