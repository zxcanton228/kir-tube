import { instance } from 'src/api/axios'

class FileService {
	private readonly _BASE_URL = '/upload-file'
	public readonly upload = async (file: FormData, folder?: string) =>
		instance.post<{ url: string; name: string }[]>(`${this._BASE_URL}`, file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
}
export const fileService = new FileService()
