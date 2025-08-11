import type { IChannel } from 'src/types/channel.types'

import { axiosClassic, instance } from 'src/api/axios'

class ChannelService {
	private readonly _BASE_URL = '/channels'

	public readonly bySlug = async (slug?: string | null) =>
		await axiosClassic.get<IChannel>(`${this._BASE_URL}/by-slug/${slug}`)
	public readonly getAll = async () => await axiosClassic.get<IChannel[]>(this._BASE_URL)
	public readonly toggleSubscribe = async (slug?: string | null) =>
		await instance.patch<IChannel[]>(`${this._BASE_URL}/toggle-subscribe/${slug}`)
}
const channelService = new ChannelService()
export default channelService
