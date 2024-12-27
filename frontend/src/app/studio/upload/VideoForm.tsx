import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { Controller, type SubmitHandler, type UseFormReturn } from 'react-hook-form'
import toast from 'react-hot-toast'
import { studioVideoService } from 'src/services/studio/studio-video.service'
import type { IVideoFormData } from 'src/types/studio-video.types'

import { STUDIO_PAGE } from 'src/config/studio-page.config'

import { Button } from 'ui/button/Button'
import { Field } from 'ui/field/Field'
import { Textarea } from 'ui/field/Textarea'
import { TagsField } from 'ui/field/tags-field/TagsField'
import { UploadField } from 'ui/field/upload-field/UploadField'

import { UploadSkeleton } from './UploadSkeleton'

type Props = { form: UseFormReturn<IVideoFormData, any, undefined>; isReadyToPublish: boolean }
export const VideoForm: FC<Props> = ({
	form: {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	},
	isReadyToPublish
}) => {
	const router = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create a video'],
		mutationFn: (data: IVideoFormData) => studioVideoService.create(data),
		onSuccess: () => {
			reset()
			toast.success('Video successfully published!')
			router.push(STUDIO_PAGE.HOME)
		},
		onError: () => {
			toast.error('Video creating has error!')
		}
	})
	const onSubmit: SubmitHandler<IVideoFormData> = data => {
		mutate(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='grid grid-cols-[2.5fr_1fr] gap-5'>
				{isPending ? (
					<UploadSkeleton />
				) : (
					<>
						<div className='border-r border-border pr-5'>
							<Field
								label='Title:'
								type='text'
								registration={register('title', {
									required: 'Title is required!',
									maxLength: 60
								})}
								error={errors.title?.message}
								placeholder='Enter title:'
							/>
							<Textarea
								label='Description:'
								registration={register('description', {
									required: 'Description is required!'
								})}
								error={errors?.description?.message}
								placeholder='Enter description:'
								rows={6}
							/>
							<Controller
								control={control}
								name='tags'
								render={({ field: { onChange, value }, fieldState: { error } }) => (
									<TagsField
										label='Tags:'
										onTagsChange={onChange}
										tags={value}
										error={error?.message}
									/>
								)}
							/>
							<Controller
								control={control}
								name='thumbnailUrl'
								render={({ field: { value, onChange }, fieldState: { error } }) => (
									<UploadField
										label='Thumbnail:'
										onChange={onChange}
										value={value}
										error={error}
										folder='thumbnails'
										className='mb-5'
										sizePreview={[151, 82]}
									/>
								)}
							/>
						</div>
						<div>
							<div className='bg-gray-700 rounded-md overflow-hidden'>
								{watch('thumbnailUrl') ? (
									<Image
										alt='Uploaded thumbnail'
										src={watch('thumbnailUrl')}
										width={249}
										height={140}
										quality={50}
									/>
								) : (
									<div className='w-[249] h-[140] bg-gray-900 font-medium text-sm flex items-center justify-center'>
										Thumbnail
									</div>
								)}
								<div className='text-sm p-2'>
									<span className='text-gray-400 text-[0.9rem] block mb-0.5'>File name:</span>
									<span>{watch('videoFileName')}</span>
								</div>
							</div>
						</div>

						<div className='text-center mt-6'>
							<Button
								isLoading={isPending}
								type='submit'
								disabled={!isReadyToPublish}
							>
								{!isReadyToPublish ? 'Wait processing' : 'Publish'}
							</Button>
						</div>
					</>
				)}
			</div>
		</form>
	)
}
