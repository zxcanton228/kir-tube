import { NextResponse } from 'next/server'

export const nextRedirect = (toUrl: string | URL, currentUrl: string | URL) =>
	NextResponse.redirect(new URL(toUrl, currentUrl))
