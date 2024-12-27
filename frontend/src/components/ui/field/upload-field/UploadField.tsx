import { UploadCloud } from 'lucide-react'
import { type FC, useId } from 'react'
import type { FieldError } from 'react-hook-form'

import { ImagePreview } from './ImagePreview'
import { useUpload } from './useUpload'

interface Props {
	folder?: string
	value?: string
	// eslint-disable-next-line
	onChange: (url: string) => void
	label: string
	error?: FieldError
	className?: string
	isImage?: boolean

	overlay?: string
	sizePreview?: [number, number]
}

export const UploadField: FC<Props> = ({
	label,
	onChange,
	className,
	error,
	folder,
	isImage = true,
	value,
	overlay,
	sizePreview = [100, 100]
}) => {
	const { isLoading, uploadFile } = useUpload({ onChange, folder })
	const inputId = useId()

	return (
		<div className={className}>
			<label
				htmlFor={inputId}
				className='block text-gray-400 font-semibold mb-2'
			>
				{label}
			</label>
			<label
				htmlFor={inputId}
				role='button'
				className='flex items-center px-4 py-2 bg-transparent text-primary rounded-lg shadow-md cursor-pointer hover:bg-primary hover:text-white border border-primary transition-colors w-max'
			>
				<UploadCloud className='mr-2' /> Upload
			</label>
			<input
				id={inputId}
				type='file'
				onChange={uploadFile}
				accept='image/*'
				className='hidden'
			/>
			{error && <p className='text-red-500 text-sm mt-1'>{error.message}</p>}
			{isImage && (
				<ImagePreview
					sizePreview={sizePreview}
					isLoading={isLoading}
					overlay={overlay}
					value={value}
				/>
			)}
		</div>
	)
}
