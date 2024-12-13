import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { NO_INDEX_PAGE } from 'src/constants/seo.constants'

const SubscriptionsPage = dynamic(() => import('./SubscriptionsPage').then(mod => mod.SubscriptionsPage))
export const metadata: Metadata = {
	title: 'Subscriptions',
	...NO_INDEX_PAGE
}

export default function SubscriptionPage() {
	return <SubscriptionsPage />
}
