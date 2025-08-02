import { type NextRequest, NextResponse } from 'next/server'

import { PAGE } from './config/public-page.config'
import { STUDIO_PAGE } from './config/studio-page.config'
import { protectLoginPages } from './server/middlewares/protect-login.middleware'
import { protectStudio } from './server/middlewares/protect-studio.middleware'

export async function middleware(request: NextRequest) {
	const url = new URL(request.url)
	const pathname = url.pathname

	if (pathname.startsWith(STUDIO_PAGE.HOME) || pathname.startsWith('/my')) {
		return protectStudio(request)
	}
	if (pathname.startsWith(PAGE.AUTH)) {
		return protectLoginPages(request)
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/studio/:path*', '/auth', '/my/:path*']
}
