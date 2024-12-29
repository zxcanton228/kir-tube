import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import type { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { studioVideoService } from 'src/services/studio/studio-video.service'
import type { IVideoFormData } from 'src/types/studio-video.types'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

import { Button } from 'ui/button/Button'

import { VideoForm } from './VideoForm'

type Props = { form: UseFormReturn<IVideoFormData, any, undefined>; isReadyToPublish: boolean }
export const CreateVideoForm: FC<Props> = ({ form, isReadyToPublish }) => {
	const router = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: async () => {
			form.reset()
			const { toast } = await import('react-hot-toast')
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.HOME)
		},
		onError: async () => {
			const { toast } = await import('react-hot-toast')
			toast.error('Video creating has error!')
		}
	})
	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}
	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<div className='text-right mt-4'>
				<VideoForm
					form={form}
					isPending={isPending}
				/>
				<Button
					type='submit'
					disabled={!isReadyToPublish}
					isLoading={isPending}
				>
					{isReadyToPublish ? 'Publish' : 'Wait processing...'}
				</Button>
			</div>
		</form>
	)
}
