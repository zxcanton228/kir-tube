'use client'

import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import type { FC } from 'react'
import { commentService } from 'src/services/comment.service'
import type { ISingleVideoResponse } from 'src/types/video.types'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Heading } from 'ui/heading/Heading'

import { CommentItem } from './CommentItem'

const DynamicAddCommentsForm = dynamic(() => import('./AddCommentsForm').then(mod => mod.AddCommentsForm), {
	ssr: false,
	loading: () => <SkeletonLoader count={1} />
})

type Props = {
	video: ISingleVideoResponse
}
export const Comments: FC<Props> = ({ video: { publicId, id, comments } }) => {
	const { data, refetch } = useQuery({
		queryKey: ['comments', publicId],
		queryFn: () => commentService.byVideoPublicId(publicId),
		initialData: comments
	})

	return (
		<div className='border-t border-t-border pt-7 mt-7 comments'>
			<Heading>{data.length} Comments</Heading>

			<DynamicAddCommentsForm
				refetch={refetch}
				videoId={id}
			/>

			{!!data &&
				data.map(comment => (
					<CommentItem
						refetch={refetch}
						key={comment.id}
						comment={comment}
					/>
				))}
		</div>
	)
}
