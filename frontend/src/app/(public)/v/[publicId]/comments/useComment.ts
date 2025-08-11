import { useMutation } from '@tanstack/react-query'
import { commentService } from 'src/services/comment.service'
import type { ICommentData } from 'src/types/comment.types'

export function useComment(commentId: string, refetch: () => void) {
	const { mutate: updateComment, isPending: isUpdatePending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.update(commentId, data),
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
		mutationFn: () => commentService.delete(commentId),
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

	return { deleteComment, idDeletePending, updateComment, isUpdatePending }
}
