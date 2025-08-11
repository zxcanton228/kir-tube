import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'
import type { ReactNode } from 'react'

import { Providers } from 'src/providers/Providers'

import { COLORS } from 'src/constants/colors.constants'
import { SITE_URL } from 'src/constants/constants'
import { SITE_NAME } from 'src/constants/seo.constants'

import './globals.scss'

const notoSans = Noto_Sans({ subsets: ['latin'] })
export const fetchCache = 'default-cache'

export const viewport: Viewport = {
	themeColor: COLORS.bg
}
export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: "Best youtube's alternative platform.",
	icons: {
		icon: '/images/logo.svg',
		shortcut: '/images/logo.svg',
		apple: '/images/256.png',
		other: {
			rel: 'touch-icons',
			url: '/images/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},

	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: [`info@redvideo.com`],
		images: [
			{
				url: '/images/og.jpg',
				width: 909,
				height: 500,
				alt: `${SITE_NAME}`
			}
		]
	},
	metadataBase: new URL(SITE_URL),
	applicationName: SITE_NAME,
	authors: {
		name: 'Kirill Vegele',
		url: 'https://github.com/zxcanton228'
	},
	manifest: '/manifest.json',
	formatDetection: {
		telephone: false
	}
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
