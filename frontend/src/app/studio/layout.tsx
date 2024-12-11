import type { PropsWithChildren } from 'react'

import { Layout } from 'src/components/layout/Layout'

export default function StudioLayout({ children }: PropsWithChildren<unknown>) {
	return <Layout>{children}</Layout>
}
