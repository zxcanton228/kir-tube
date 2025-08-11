import Cookies from 'js-cookie'
import { store } from 'src/store'
import { EnumTokens } from 'src/types/auth.types'

import { clearAuthData } from 'src/store/auth.slice'

class AuthTokenService {
	getAccessToken() {
		const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
		return accessToken || null
	}

	saveAccessToken(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: '.' + process.env.NEXT_PUBLIC_DOMAIN,
			sameSite: 'strict',
			expires: 1
		})
	}

	removeAccessToken() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
		store.dispatch(clearAuthData())
	}
}

export default new AuthTokenService()
