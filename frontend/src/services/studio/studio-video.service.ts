import type { IPaginationParams } from 'src/types/pagination.types'
import type { IVideoFormData } from 'src/types/studio-video.types'
import type { IStudioVideoResponse, IVideosPagination } from 'src/types/video.types'

import { instance } from 'src/api/axios'

class StudioVideoService {
	private _BASE_URL = '/studio/videos'

	public readonly getAll = async (params: IPaginationParams) => {
		const { data } = await instance.get<IVideosPagination>(this._BASE_URL, {
			params
		})
		return data
	}

	public readonly byId = async (id: string) => instance.get<IStudioVideoResponse>(`${this._BASE_URL}/${id}`)

	public readonly create = async (dto: IVideoFormData) => instance.post(this._BASE_URL, dto)

	public readonly update = async (id: string, dto: IVideoFormData) => instance.put(`${this._BASE_URL}/${id}`, dto)

	public readonly delete = async (id: string) => instance.delete(`${this._BASE_URL}/${id}`)
}

export const studioVideoService = new StudioVideoService()
