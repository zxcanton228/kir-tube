import type { NextRequest } from 'next/server'

import { PAGE } from './config/public-page.config'
import { STUDIO_PAGE } from './config/studio-page.config'
import { protectLoginPages } from './server/middlewares/protect-login.middleware'
import { protectStudio } from './server/middlewares/protect-studio.middleware'

export async function middleware(request: NextRequest) {
	const url = new URL(request.url)
	const pathname = url.pathname

	if (pathname.includes(STUDIO_PAGE.HOME) || pathname.includes(PAGE.SUBSCRIPTIONS)) return protectStudio(request)

	if (pathname.includes(PAGE.AUTH)) return protectLoginPages(request)
}

export const config = {
	matcher: ['/studio/:path*', '/auth/:path*', '/subscriptions/:path*']
}
