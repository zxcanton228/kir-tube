import { SkeletonLoader } from 'ui/SkeletonLoader'

export const UploadSkeleton = () => {
	return (
		<>
			<div>
				<SkeletonLoader
					className='bg-gray-700 h-[74px]'
					count={1}
				/>
				<SkeletonLoader
					className='bg-gray-700 h-[224px]'
					count={1}
				/>
				<SkeletonLoader
					className='bg-gray-700'
					count={1}
				/>
				<SkeletonLoader
					className='bg-gray-700 h-[85px]'
					count={1}
				/>
				<SkeletonLoader
					className='bg-gray-700 h-[140px]'
					count={1}
				/>
			</div>
			<div>
				<SkeletonLoader
					className='bg-gray-700 w-[249px] h-[140px]'
					count={1}
				/>
				<SkeletonLoader
					className='bg-gray-700'
					count={2}
				/>
			</div>
		</>
	)
}
