import type { FC } from 'react'
import type { IComment } from 'src/types/comment.types'

import { useComment } from './useComment'

type Props = { comment: IComment; refetch: () => void; newText: string; isLoggedIn: boolean; userId?: string }

export const CommentActions: FC<Props> = ({ comment, refetch, newText, isLoggedIn, userId }) => {
	const { deleteComment, idDeletePending, updateComment, isUpdatePending } = useComment(comment.id, refetch)

	if (!isLoggedIn || userId !== comment.user.id) return null

	return (
		<div className='flex items-center gap-3 mt-2'>
			<button
				className='text-gray-400 text-sm hover:opacity-100 opacity-90 transition-opacity'
				disabled={isUpdatePending}
				onClick={() => updateComment({ text: newText, videoId: comment.videoId })}
			>
				Save
			</button>
			<button
				className='text-gray-400 text-sm hover:opacity-100 opacity-90 transition-opacity'
				onClick={() => deleteComment()}
				aria-label='Delete'
			>
				{idDeletePending ? '...' : 'Delete'}
			</button>
		</div>
	)
}
