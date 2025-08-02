import type { IUser } from './user.types'

export const EnumTokens = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken'
} as const

export type AuthToken = (typeof EnumTokens)[keyof typeof EnumTokens]

export interface IAuthResponse {
	user: IUser
	accessToken: string
}
