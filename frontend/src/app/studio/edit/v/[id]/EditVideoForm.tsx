'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Edit } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { VideoForm } from 'src/app/studio/upload/VideoForm'
import { studioVideoService } from 'src/services/studio/studio-video.service'
import type { IVideoFormData } from 'src/types/studio-video.types'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

import { Heading } from 'ui/Heading'
import { Button } from 'ui/button/Button'

export function EditVideoForm() {
	const { id } = useParams()
	const router = useRouter()

	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const { data, isLoading, isSuccess } = useQuery({
		queryKey: ['get studio video', id],
		queryFn: () => studioVideoService.byId(id as string)
	})

	useEffect(() => {
		if (!isSuccess || !data) return

		const initialVideo = data.data

		form.reset({
			title: initialVideo.title,
			description: initialVideo.description,
			maxResolution: initialVideo.maxResolution,
			thumbnailUrl: initialVideo.thumbnailUrl,
			tags: initialVideo.tags.map(tag => tag.name),
			videoFileName: initialVideo.videoFileName
		})
		// eslint-disable-next-line
	}, [isSuccess, data])

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['edit a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.update(id as string, data),
		onSuccess: async () => {
			const { toast } = await import('react-hot-toast')
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})
			toast.success('Video successfully updated!')
			router.push(STUDIO_PAGE.HOME)
		},
		onError: async () => {
			const { toast } = await import('react-hot-toast')
			toast.error('Video updating has error!')
		}
	})

	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<div className='max-w-6xl mx-auto'>
			<Heading
				Icon={Edit}
				isPageHeading
			>
				Edit video
			</Heading>

			<form onSubmit={form.handleSubmit(onSubmit)}>
				<VideoForm
					form={form}
					isPending={isLoading || isPending}
				/>
				<div className='text-right mt-4'>
					<Button
						type='submit'
						isLoading={isPending}
					>
						Update
					</Button>
				</div>
			</form>
		</div>
	)
}
