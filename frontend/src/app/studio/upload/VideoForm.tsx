import Image from 'next/image'
import type { FC } from 'react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { IVideoFormData } from 'src/types/studio-video.types'

import { Field } from 'ui/field/Field'
import { Textarea } from 'ui/field/Textarea'
import { TagsField } from 'ui/field/tags-field/TagsField'
import { UploadField } from 'ui/field/upload-field/UploadField'

import { UploadSkeleton } from './UploadSkeleton'

type Props = { isPending?: boolean; form: UseFormReturn<IVideoFormData> }
export const VideoForm: FC<Props> = ({
	isPending,
	form: {
		register,
		control,
		formState: { errors },
		watch
	}
}) => (
	<div className='grid-cols-[2.5fr_1fr] grid gap-10'>
		{isPending ? (
			<UploadSkeleton />
		) : (
			<>
				<div>
					<Field
						label='Title'
						type='text'
						registration={register('title', { required: 'Title is required!' })}
						error={errors.title?.message}
						placeholder='Enter title:'
					/>

					<Textarea
						registration={register('description')}
						error={errors?.description?.message}
						placeholder='Enter description:'
						label='Description'
						rows={7}
					/>
					<Controller
						control={control}
						name='thumbnailUrl'
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<UploadField
								sizePreview={[151, 82]}
								onChange={onChange}
								folder='thumbnails'
								label='Thumbnail:'
								className='mb-5'
								value={value}
								error={error}
							/>
						)}
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
				</div>

				<div>
					<div className='bg-gray-700 rounded-md overflow-hidden'>
						{watch('thumbnailUrl') ? (
							<Image
								src={watch('thumbnailUrl')}
								alt='Uploaded thumbnail'
								className='w-full asp'
								width={249}
								height={140}
							/>
						) : (
							<div className='w-[249] h-[140] bg-gray-900 font-medium text-sm flex items-center justify-center'>
								Wait thumbnail...
							</div>
						)}
						<div className='text-sm p-2'>
							<span className='text-gray-400 text-[0.9rem] block mb-0.5'>File name:</span>
							<span>{watch('videoFileName')}</span>
						</div>
					</div>
				</div>
			</>
		)}
	</div>
)
