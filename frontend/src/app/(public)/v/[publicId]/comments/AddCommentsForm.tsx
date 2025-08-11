'use client'

import { useMutation } from '@tanstack/react-query'
import type { FC } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { commentService } from 'src/services/comment.service'
import type { ICommentData } from 'src/types/comment.types'

import { Textarea } from 'ui/field/Textarea'

type Props = { refetch: () => void; videoId: string; isLoggedIn: boolean }
export const AddCommentsForm: FC<Props> = ({ refetch, videoId, isLoggedIn }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ICommentData>({ mode: 'onChange' })
	const { mutate, isPending } = useMutation({
		mutationKey: ['create comment'],
		mutationFn: (data: ICommentData) => commentService.create(data),
		onSuccess: () => {
			refetch()
			reset()
		}
	})
	const onSubmit: SubmitHandler<ICommentData> = ({ text }) => {
		mutate({ text, videoId })
	}

	return (
		isLoggedIn && (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='grid grid-cols-[7fr_1fr] gap-14'
			>
				<Textarea
					registration={register('text', { required: true })}
					placeholder='Enter comment:'
					error={errors.text?.message}
					wrapperClassName='m-0'
					rows={1}
				/>
				<button
					className='bg-border font-medium rounded-md h-max py-2'
					disabled={isPending}
					type='submit'
				>
					{isPending ? '...' : 'Comment'}
				</button>
			</form>
		)
	)
}
