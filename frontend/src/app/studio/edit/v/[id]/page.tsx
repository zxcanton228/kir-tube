import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from 'src/constants/seo.constants'

import { EditVideoForm } from './EditVideoForm'

export const metadata: Metadata = {
	title: 'Edit video',
	...NO_INDEX_PAGE
}

export default function EditVideoPage() {
	return <EditVideoForm />
}
