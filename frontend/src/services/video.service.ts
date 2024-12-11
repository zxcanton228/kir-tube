import type { AxiosResponse } from 'axios'
import type { IMain, IVideo } from 'src/types/video.types'

import { axiosClassic } from 'src/api/axios'

class VideoService {
	private readonly _BASE_URL = '/videos'

	public readonly getAll = async (searchTerm?: string | null) => {
		const data = await axiosClassic.get<IMain>(
			this._BASE_URL,
			searchTerm
				? {
						params: {
							searchTerm
						}
					}
				: {}
		)
		return data
	}

	public readonly getTrendingVideos = async (): Promise<AxiosResponse<IVideo[]>> =>
		axiosClassic.get<IVideo[]>(`${this._BASE_URL}/trending`)

	public readonly getGamesVideos = async (): Promise<AxiosResponse<IMain>> =>
		axiosClassic.get<IMain>(`${this._BASE_URL}/games`)

	public readonly getExploreVideos = async () =>
		axiosClassic.get<IMain>(`${this._BASE_URL}/explore`)
}
export const videoService = new VideoService()
