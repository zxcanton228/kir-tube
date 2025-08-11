import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import authTokenService from 'src/services/auth/auth-token.service'
import { authService } from 'src/services/auth/auth.service'

import { API_URL } from 'src/constants/constants'

import { errorCatch } from './api.helper'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const axiosClassic = axios.create(options)
export const instance = axios.create(options)

instance.interceptors.request.use(config => {
	const accessToken = authTokenService.getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				error.response.status === 403 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true

			try {
				await authService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired' || errorCatch(error) === 'Refresh token not passed') {
					authTokenService.removeAccessToken()
				}
			}
		}

		throw error
	}
)
