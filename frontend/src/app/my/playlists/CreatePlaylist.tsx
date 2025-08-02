'use client'

import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { FC, RefObject } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useHotkeys } from 'react-hotkeys-hook'
import { playlistService } from 'src/services/playlist.service'
import type { IPlaylistData } from 'src/types/playlist.types'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Button } from 'ui/button/Button'
import { Field } from 'ui/field/Field'
import { Heading } from 'ui/heading/Heading'

type Props = { refetch: () => void; onClose: () => void; ref: RefObject<any | null> }
export const CreatePlaylist: FC<Props> = ({ refetch, onClose, ref }) => {
	const {
		register,
		handleSubmit,

		reset,
		formState: { errors }
	} = useForm<IPlaylistData>({ mode: 'onChange' })
	const { mutate, isPending } = useMutation({
		mutationKey: ['create playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		onSuccess: async () => {
			const { toast } = await import('react-hot-toast')
			refetch()
			reset()
			onClose()
			toast.success('Playlist created!')
		}
	})

	const onSubmit: SubmitHandler<IPlaylistData> = data => mutate(data)
	useHotkeys('esc', e => {
		e.preventDefault()
		onClose()
	})

	return (
		<div className='fixed inset-0 z-50 justify-center flex items-center bg-[rgba(0,0,0,0.5)]'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className='relative w-[26rem]'
			>
				<div
					className='bg-gray-800 rounded-lg p-6'
					ref={ref}
				>
					<button
						onClick={onClose}
						className='absolute top-2 right-2 text-white'
						title='Close a modal'
					>
						<X />
					</button>
					<Heading classNameHeading='text-xl'>Create a playlist</Heading>
					<form onSubmit={handleSubmit(onSubmit)}>
						{isPending ? (
							<SkeletonLoader
								count={3}
								className='w-full h-10'
							/>
						) : (
							<>
								<Field
									label='Title'
									type='text'
									registration={register('title', {
										required: 'Title is required!',
										maxLength: 30
									})}
									error={errors.title?.message}
									placeholder='Enter title:'
								/>
								<Field
									label='Video id (from url)'
									type='text'
									registration={register('videoPublicId', {
										required: 'Video id is required!',
										validate: value => {
											if (value.length !== 10) return 'Video id must exactly 10 characters!'
										}
									})}
									error={errors.videoPublicId?.message}
									placeholder='Video id:'
								/>
								<div className='text-center mt-6'>
									<Button
										isLoading={isPending}
										type='submit'
									>
										{isPending ? '...' : 'Create'}
									</Button>
								</div>
							</>
						)}
					</form>
				</div>
			</m.div>
		</div>
	)
}
