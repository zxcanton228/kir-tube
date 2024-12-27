import type { IFileResponse, IProgressProcessingResponse } from 'src/types/file.types'

import { instance } from 'src/api/axios'

class FileService {
	private readonly _BASE_URL = '/upload-file'
	upload = (file: FormData, folder?: string) =>
		instance.post<IFileResponse[]>(this._BASE_URL, file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})

	getProcessingStatus = (fileName: string) =>
		instance.get<IProgressProcessingResponse>(`${this._BASE_URL}/status/${fileName}`)
}
export const fileService = new FileService()
