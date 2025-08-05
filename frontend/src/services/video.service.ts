import type { AxiosResponse } from 'axios'
import type { IPaginationParams } from 'src/types/pagination.types'
import type { ISingleVideoResponse, IVideo, IVideosPagination } from 'src/types/video.types'

import { axiosClassic } from 'src/api/axios'

class VideoService {
	private readonly _BASE_URL = '/videos'

	public async getAll(searchTerm?: string | null): Promise<IVideosPagination> {
		const { data } = await axiosClassic.get<IVideosPagination>(
			this._BASE_URL,
			searchTerm
				? {
						params: { searchTerm }
					}
				: {}
		)
		return data
	}

	public async byPublicId(publicId?: string | null): Promise<ISingleVideoResponse> {
		const { data } = await axiosClassic.get<ISingleVideoResponse>(`${this._BASE_URL}/by-publicId/${publicId}`)
		return data
	}

	public readonly getTrendingVideos = async (): Promise<AxiosResponse<IVideo[]>> =>
		axiosClassic.get<IVideo[]>(`${this._BASE_URL}/trending`)

	public readonly getGamesVideos = async () => axiosClassic.get<IVideosPagination>(`${this._BASE_URL}/games`)

	public readonly updateViews = async (publicId: string) =>
		axiosClassic.put(`${this._BASE_URL}/update-views-count/${publicId}`)

	public readonly getExploreVideos = async (userId?: string | number, params?: IPaginationParams, excludeIds?: string[]) => {
		const excludeIdsToString = excludeIds?.join(',') || ''
		const { data } = await axiosClassic.get<IVideosPagination>(`${this._BASE_URL}/explore`, {
			params: userId ? { userId, ...params, excludeIds: excludeIdsToString } : params
		})
		return data
	}
}
export const videoService = new VideoService()
