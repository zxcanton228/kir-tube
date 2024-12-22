import type { NextRequest } from 'next/server'

import { PAGE } from 'src/config/public-page.config'

import { nextRedirect } from './next-redirect'

export const redirectToLogin = (req: NextRequest) => nextRedirect(PAGE.AUTH, req.url)
