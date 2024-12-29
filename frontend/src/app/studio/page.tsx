import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from 'src/constants/seo.constants'

import { StudioVideoList } from './StudioVideoList'

export const metadata: Metadata = {
	title: 'Studio',
	...NO_INDEX_PAGE
}

export default function StudioPage() {
	return <StudioVideoList />
}
