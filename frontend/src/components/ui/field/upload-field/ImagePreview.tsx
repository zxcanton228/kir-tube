import Image from 'next/image'

import { SkeletonLoader } from 'ui/SkeletonLoader'

interface Props {
	isLoading: boolean
	value?: string
	overlay?: string
	aspectRation?: '16:9' | '1:1'
}

export function ImagePreview({ isLoading, overlay, value, aspectRation }: Props) {
	const isWidescreenRation = aspectRation === '16:9'
	const width = isWidescreenRation ? 446 : 100
	const height = isWidescreenRation ? 250 : 100

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
								alt='Overlay'
								className='rounded-md absolute top-0 left-0 w-full h-full'
								src={overlay}
								width={width}
								height={height}
								quality={90}
								priority
							/>
						)}
						<Image
							alt='Uploaded file'
							className='rounded-md'
							src={value}
							width={width}
							height={height}
							quality={90}
							priority
						/>
					</div>
				)
			)}
		</div>
	)
}
