'use client'

import * as m from 'framer-motion/m'
import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { IVideoFormData } from 'src/types/studio-video.types'

import { Heading } from 'ui/Heading'

import { DragNDropVideo } from './DragNDropVideo'
import { ProgressVideoProcessing } from './ProgressVideoProcessing'
import { VideoForm } from './VideoForm'

const UploadVideoForm: FC = () => {
	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const [isReadyToPublish, setIsReadyToPublish] = useState<boolean>(false)
	const fileName = form.watch('videoFileName')

	return (
		<div className='absolute inset-0 z-50 justify-center flex items-center bg-[rgba(0,0,0,0.5)]'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				className='relative max-w-[60rem] w-[800px]'
			>
				<div className='bg-gray-800 rounded-lg p-6'>
					<Heading
						className='border-b border-border pb-5'
						classNameHeading='text-xl'
					>
						Upload video
					</Heading>
					<ProgressVideoProcessing
						setIsReadyToPublish={setIsReadyToPublish}
						fileName={fileName}
						isReadyToPublish={isReadyToPublish}
					/>
					{!fileName && <DragNDropVideo reset={form.reset} />}

					{!!fileName && (
						<VideoForm
							form={form}
							isReadyToPublish={isReadyToPublish}
						/>
					)}
				</div>
			</m.div>
		</div>
	)
}
export default UploadVideoForm
