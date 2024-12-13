import type { ISettingsData } from 'src/app/studio/settings/settings.types'
import type { IProfileResponse } from 'src/types/user.types'

import { instance } from 'src/api/axios'

class UserService {
	private readonly _BASE_URL = '/users'

	public readonly getProfile = async () => instance.get<IProfileResponse>(`${this._BASE_URL}/profile`)
	public readonly updateProfile = async (data: ISettingsData) =>
		instance.put<boolean>(`${this._BASE_URL}/profile`, {
			channel: {
				slug: data?.channel?.slug.toLowerCase().replace(/ /g, '-')
			},
			...data
		})
}
export const userService = new UserService()
