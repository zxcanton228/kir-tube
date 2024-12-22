import Cookies from 'js-cookie'
import type { IAuthData } from 'src/app/auth/auth-form.types'
import { store } from 'src/store'
import { EnumTokens, type IAuthResponse } from 'src/types/auth.types'

import { clearAuthData, setAuthData } from 'src/store/auth.slice'

import { axiosClassic } from 'src/api/axios'

class AuthService {
	private _BASE_URL = '/auth'

	async main(type: 'login' | 'register', data: IAuthData, recaptchaToken?: string | null) {
		const response = await axiosClassic.post<IAuthResponse>(`${this._BASE_URL}/${type}`, data, {
			headers: {
				recaptcha: recaptchaToken
			}
		})

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}

		return response
	}

	// CLIENT
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(`${this._BASE_URL}/access-token`)

		if (response.data.accessToken) {
			this._saveTokenStorage(response.data.accessToken)
			store.dispatch(setAuthData(response.data))
		}

		return response
	}
	async initializeAuth() {
		const initialStore = store.getState().auth
		if (initialStore.user) return

		try {
			await this.getNewTokens()
			// eslint-disable-next-line
		} catch (e) {
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
			this.removeFromStorage()
			store.dispatch(clearAuthData())
		}

		return response
	}

	private _saveTokenStorage(accessToken: string) {
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: process.env.NEXT_PUBLIC_DOMAIN,
			sameSite: 'strict',
			expires: 1 / 24,
			secure: true
		})
	}

	public removeFromStorage() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)

		store.dispatch(clearAuthData())
	}
}

export const authService = new AuthService()
