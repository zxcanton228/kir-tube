import type { AxiosResponse } from 'axios'
import type { ISettingsData } from 'src/app/studio/settings/settings.types'
import type { IFullUser } from 'src/types/user.types'

import { instance } from 'src/api/axios'

class UserService {
	private readonly _BASE_URL = '/users'

	public readonly getProfile = async (): Promise<AxiosResponse<IFullUser>> =>
		instance.get<IFullUser>(`${this._BASE_URL}/profile`)
	public readonly updateProfile = async (data: ISettingsData): Promise<AxiosResponse<boolean>> =>
		instance.put<boolean>(`${this._BASE_URL}/profile`, data)
}
export const userService = new UserService()
