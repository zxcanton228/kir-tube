import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import { Providers } from 'src/providers/Providers'

import { SITE_URL } from 'src/constants/constants'

import './globals.scss'

const notoSans = Noto_Sans({ subsets: ['latin'] })
export const fetchCache = 'default-cache'
export const metadata: Metadata = {
	title: {
		absolute: 'KIR Video',
		template: `%s | KIR Video`
	},
	description: 'The best Video hosting',
	metadataBase: new URL(SITE_URL)
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
