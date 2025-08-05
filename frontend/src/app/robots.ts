import type { MetadataRoute } from 'next'

import { SITE_URL } from 'src/constants/constants'

import { PAGE } from 'src/config/public-page.config'
import { STUDIO_PAGE } from 'src/config/studio-page.config'

const QUERIES = ['/auth', '/recover', '*?', '/docs/*', '*utm_', '*?query=', '/media/*?PAGEN_1=', '*?keyword=', '*?sub']

const BOTS = [
	'Googlebot',
	'Yandex',
	'Applebot',
	'Slurp',
	'Yahoo! Slurp',
	'MSNBot',
	'Teoma',
	'Scooter',
	'ia_archivet',
	'Lycos',
	'StackRambler',
	'Mail.Ru',
	'*',
	'Aport',
	'WebAlta',
	'WebAlta Crawler/2.0'
]
const disallow: string[] = [
	...QUERIES.map(q => `*?${q}=`),
	...Object.values(STUDIO_PAGE),
	PAGE.HISTORY,
	PAGE.LIKED_VIDEOS,
	PAGE.SEARCH,
	PAGE.PLAYLISTS,
	PAGE.SUBSCRIPTIONS
]

export default function robots(): MetadataRoute.Robots {
	return {
		rules: BOTS.map(userAgent => ({
			userAgent,
			allow: '*',
			disallow
		})),
		sitemap: `${SITE_URL}/sitemap.xml`
	}
}
