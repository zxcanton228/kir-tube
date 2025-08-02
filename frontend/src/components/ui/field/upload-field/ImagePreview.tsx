import Image from 'next/image'
import type { FC } from 'react'

import { SkeletonLoader } from 'ui/SkeletonLoader'

interface Props {
	isLoading: boolean
	value?: string
	overlay?: string

	sizePreview: [number, number]
}

export const ImagePreview: FC<Props> = ({ isLoading, overlay, value, sizePreview }) => {
	const [width, height] = sizePreview

	return (
		<div className='mt-3'>
			{isLoading ? (
				<SkeletonLoader
					style={{
						width,
						height
					}}
				/>
			) : (
				!!value && (
					<div className='relative'>
						{!!overlay && (
							<Image
								className='rounded-md absolute top-0 left-0 w-full h-full'
								height={height}
								alt='Overlay'
								src={overlay}
								width={width}
								quality={90}
								priority
							/>
						)}
						<Image
							className='rounded-md asp'
							alt='Uploaded file'
							height={height}
							quality={90}
							width={width}
							src={value}
							priority
						/>
					</div>
				)
			)}
		</div>
	)
}
