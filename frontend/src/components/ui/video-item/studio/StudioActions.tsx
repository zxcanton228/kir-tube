import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { type FC, useCallback } from 'react'
import toast, { type Toast } from 'react-hot-toast'
import { studioVideoService } from 'src/services/studio/studio-video.service'
import type { IVideo } from 'src/types/video.types'

import { PAGE } from 'src/config/public-page.config'
import { STUDIO_PAGE } from 'src/config/studio-page.config'

type Props = { video: IVideo }
export const StudioActions: FC<Props> = ({ video }) => {
	const queryClient = useQueryClient()

	const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete a video'],
		mutationFn: () => studioVideoService.delete(video.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			toast.success('Successfully deleted!')
		}
	})

	const handleDelete = useCallback(() => {
		toast((t: Toast) => (
			<div>
				<p>Are you sure you want to delete this video?</p>
				<div className='flex justify-end gap-4 mt-2'>
					<button
						onClick={() => {
							deleteVideo()
							toast.dismiss(t.id)
						}}
						className='text-red-600'
					>
						Delete
					</button>
					<button
						onClick={() => toast.dismiss(t.id)}
						className='text-gray-400'
					>
						Cancel
					</button>
				</div>
			</div>
		))
	}, [deleteVideo])

	return (
		<div className='flex justify-center items-start gap-5'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				className='text-blue-600 transition-opacity opacity-70 hover:opacity-100'
				target='_blank'
				title='Open in a new tab'
			>
				<ExternalLink size={22} />
			</Link>
			<Link
				href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
				className='text-orange-500 transition-opacity opacity-70 hover:opacity-100'
				title='Edit a video'
			>
				<Edit size={22} />
			</Link>
			<button
				onClick={handleDelete}
				className='text-red-600 transition-opacity opacity-70 hover:opacity-100'
				title='Delete a video'
				disabled={isDeletePending}
			>
				<Trash2 size={22} />
			</button>
		</div>
	)
}
