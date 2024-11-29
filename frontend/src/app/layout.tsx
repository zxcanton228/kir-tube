import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Layout } from 'src/components/layout/Layout'

import './globals.scss'

const notoSans = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'KIR Video',
	description: 'The best Videohosting'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className} antialiased`}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
