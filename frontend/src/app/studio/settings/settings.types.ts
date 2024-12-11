import type { IChannel } from 'src/types/channel.types'
import type { IFullUser } from 'src/types/user.types'

export interface ISettingsData extends Pick<IFullUser, 'name' | 'email'> {
	channel?: Pick<IChannel, 'avatarUrl' | 'bannerUrl' | 'slug'>
}
