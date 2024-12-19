import type { AxiosResponse } from 'axios'
import type { ISingleVideoResponse, IVideo, IVideosPagination } from 'src/types/video.types'

import { axiosClassic } from 'src/api/axios'

class VideoService {
	private readonly _BASE_URL = '/videos'

	public readonly getAll = async (searchTerm?: string | null): Promise<AxiosResponse<IVideosPagination>> =>
		axiosClassic.get<IVideosPagination>(
			this._BASE_URL,
			searchTerm
				? {
						params: {
							searchTerm
						}
					}
				: {}
		)

	public readonly byPublicId = async (publicId?: string | null): Promise<AxiosResponse<ISingleVideoResponse>> =>
		axiosClassic.get<ISingleVideoResponse>(`${this._BASE_URL}/by-publicId/${publicId}`)

	public readonly getTrendingVideos = async (): Promise<AxiosResponse<IVideo[]>> =>
		axiosClassic.get<IVideo[]>(`${this._BASE_URL}/trending`)

	public readonly getGamesVideos = async () => axiosClassic.get<IVideosPagination>(`${this._BASE_URL}/games`)

	public readonly getExploreVideos = async (): Promise<AxiosResponse<IVideosPagination>> =>
		axiosClassic.get<IVideosPagination>(`${this._BASE_URL}/explore`)
}
export const videoService = new VideoService()
