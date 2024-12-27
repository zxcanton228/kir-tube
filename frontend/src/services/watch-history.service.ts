import type { AxiosResponse } from 'axios'
import type { IFullVideo } from 'src/types/video.types'

import { instance } from 'src/api/axios'

class WatchHistoryService {
	private readonly _BASE_URL = '/watch-history'

	public readonly getUserHistory = async (): Promise<AxiosResponse<{ video: IFullVideo }[]>> =>
		instance.get<{ video: IFullVideo }[]>(this._BASE_URL)
	public readonly addToHistory = async (videoId: string): Promise<AxiosResponse> =>
		instance.post(this._BASE_URL, { videoId })
	public readonly clearHistory = async (): Promise<AxiosResponse> => instance.delete(this._BASE_URL)
}
export const watchHistoryService = new WatchHistoryService()
