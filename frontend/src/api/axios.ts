import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import Cookies from 'js-cookie'
import { authService } from 'src/services/auth.service'
import { EnumTokens } from 'src/types/auth.types'

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
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	if (config.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`
	return config
})
instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			error.response.status === 401 ||
			errorCatch(error) === 'jwt expired' ||
			(errorCatch(error) === 'jwt must be provided' && originalRequest && !originalRequest._isRetry)
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired' || errorCatch(error) === 'Refresh token not passed') {
					authService.removeFromStorage()
					return null
				}
			}
		}
		throw error
	}
)
