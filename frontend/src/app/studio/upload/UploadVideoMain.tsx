'use client'

import * as m from 'framer-motion/m'
import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { IVideoFormData } from 'src/types/studio-video.types'

import { Heading } from 'ui/heading/Heading'

import { CreateVideoForm } from './CreateVideoForm'
import { DragNDropVideo } from './DragNDropVideo'
import { ProgressVideoProcessing } from './ProgressVideoProcessing'

const UploadVideoForm: FC = () => {
	const form = useForm<IVideoFormData>({
		mode: 'onChange'
	})

	const [isReadyToPublish, setIsReadyToPublish] = useState<boolean>(false)
	const fileName = form.watch('videoFileName')

	return (
		<div className='absolute inset-0 z-50 justify-center flex items-center bg-[rgba(0,0,0,0.5)]'>
			<m.div
				className='relative max-w-[60rem] w-[800px]'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
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
						isReadyToPublish={isReadyToPublish}
						fileName={fileName}
					/>
					{!fileName && <DragNDropVideo reset={form.reset} />}

					{!!fileName && (
						<CreateVideoForm
							isReadyToPublish={isReadyToPublish}
							form={form}
						/>
					)}
				</div>
			</m.div>
		</div>
	)
}
export default UploadVideoForm
