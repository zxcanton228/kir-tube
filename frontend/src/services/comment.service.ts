import type { IComment, ICommentData } from 'src/types/comment.types'

import { axiosClassic, instance } from 'src/api/axios'

class CommentService {
	private readonly _URL = '/comments'

	public readonly byVideoPublicId = async (publicId: string | number) =>
		(await axiosClassic.get<IComment[]>(`${this._URL}/by-video/${publicId}`)).data

	public readonly update = async (id: string | number, data: ICommentData) =>
		instance.put<IComment>(`${this._URL}/${id}`, data)

	public readonly create = async (data: ICommentData) => instance.post<IComment>(this._URL, data)

	public readonly delete = async (id: string | number) => instance.delete<IComment>(`${this._URL}/${id}`)
}
export const commentService = new CommentService()
