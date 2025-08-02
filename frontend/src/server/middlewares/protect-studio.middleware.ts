import { type NextRequest, NextResponse } from 'next/server'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

import { getTokensFromRequest } from './utils/get-tokens-from-request'
import { jwtVerifyServer } from './utils/jwt-verify'
import { redirectToLogin } from './utils/redirect-to-login'

export async function protectStudio(request: NextRequest) {
	const tokens = await getTokensFromRequest(request)
	if (!tokens) return redirectToLogin(request)

	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) return redirectToLogin(request)

	const isStudioPage = request.url.includes(STUDIO_PAGE.HOME)
	if (isStudioPage) return NextResponse.next()
}
