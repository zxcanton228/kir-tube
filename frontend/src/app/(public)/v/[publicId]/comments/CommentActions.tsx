import { useMutation } from '@tanstack/react-query'
import type { FC } from 'react'
import { commentService } from 'src/services/comment.service'
import type { IComment, ICommentData } from 'src/types/comment.types'

import { useAuth } from 'src/hooks/useAuth'

type Props = { comment: IComment; refetch: () => void; newText: string }
export const CommentActions: FC<Props> = ({ comment, refetch, newText }) => {
	const { isLoggedIn, user } = useAuth()

	const { mutate: updateComment, isPending: isUpdatePending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.update(comment.id, data),
		onSuccess: async () => {
			refetch()
			const { toast } = await import('react-hot-toast')
			toast.success('Comment updated')
		},
		onError: async () => {
			const { toast } = await import('react-hot-toast')
			toast.success("Comment don't updated")
		}
	})
	const { mutate: deleteComment, isPending: idDeletePending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: () => commentService.delete(comment.id),
		onSuccess: async () => {
			refetch()
			const { toast } = await import('react-hot-toast')
			toast.success('Comment deleted')
		},
		onError: async () => {
			const { toast } = await import('react-hot-toast')
			toast.error("Comment don't deleted")
		}
	})
	if (!isLoggedIn || user?.id !== comment.user.id) return null

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
			>
				{idDeletePending ? '...' : 'Delete'}
			</button>
		</div>
	)
}
