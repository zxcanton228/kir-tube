import type { IAuthData } from 'src/app/auth/auth-form.types'
import { store } from 'src/store'
import type { IAuthResponse } from 'src/types/auth.types'

import { clearAuthData, setAuthData } from 'src/store/auth.slice'

import { axiosClassic } from 'src/api/axios'

import authTokenService from './auth-token.service'

class AuthService {
	private _BASE_URL = '/auth'

	async main(type: 'login' | 'register', data: IAuthData, recaptchaToken?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._BASE_URL}/${type}`, data, {
			headers: {
				recaptcha: recaptchaToken
			}
		})

		if (response.data.accessToken) {
			authTokenService.saveAccessToken(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}

		return response
	}

	// CLIENT
	async getNewTokens() {
		try {
			const response = await axiosClassic.post<IAuthResponse>(`${this._BASE_URL}/access-token`)

			if (response.data.accessToken) {
				authTokenService.saveAccessToken(response.data.accessToken)
				store.dispatch(setAuthData(response.data))
			}

			return response
		} catch {
			return null
		}
	}
	async initializeAuth() {
		const initialStore = store.getState().auth
		if (!!initialStore.user) return

		try {
			await this.getNewTokens()
		} catch {
			store.dispatch(clearAuthData())
		}
	}

	// SERVER
	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this._BASE_URL}/access-token`,
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)

		return response.data
	}

	async logout() {
		const response = await axiosClassic.post<boolean>(`${this._BASE_URL}/logout`)

		if (response.data) {
			authTokenService.removeAccessToken()
			store.dispatch(clearAuthData())
		}

		return response
	}
}

export const authService = new AuthService()
