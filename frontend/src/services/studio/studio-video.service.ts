import type { IVideoFormData } from 'src/types/studio-video.types'
import type { IVideo, IVideosPagination } from 'src/types/video.types'

import { instance } from 'src/api/axios'

class StudioVideoService {
	private _BASE_URL = '/studio/videos'

	public readonly getAll = async (searchTerm?: string | null, page?: number, limit?: number) =>
		instance.get<IVideosPagination>(this._BASE_URL, {
			params: {
				searchTerm,
				page,
				limit
			}
		})

	public readonly byId = async (id: string) => instance.get<IVideo>(`${this._BASE_URL}/${id}`)

	public readonly create = async (dto: IVideoFormData) => instance.post(this._BASE_URL, dto)

	public readonly update = async (id: string, dto: IVideoFormData) => instance.put(`${this._BASE_URL}/${id}`, dto)

	public readonly delete = async (id: string) => instance.delete(`${this._BASE_URL}/${id}`)
}

export const studioVideoService = new StudioVideoService()
