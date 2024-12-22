'use server'

import type { IUser } from 'src/types/user.types'

import { API_URL } from 'src/constants/constants'

interface IAuthResponse {
	user: IUser
	accessToken: string
}

export async function getNewTokensByRefresh(refreshToken: string) {
	const response = await fetch(`${API_URL}/auth/access-token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `refreshToken=${refreshToken}`
		},
		credentials: 'include'
	})

	if (!response.ok) throw new Error('Failed to fetch new tokens')

	const data: IAuthResponse = await response.json()
	return data
}
