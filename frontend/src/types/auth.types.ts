import type { IUser } from './user.types'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}
export interface IAuthResponse {
	user: IUser
	accessToken: string
}
