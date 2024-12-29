import { useQuery } from '@tanstack/react-query'
import { type Dispatch, type FC, type SetStateAction, useEffect, useState } from 'react'
import { fileService } from 'src/services/studio/file.service'

type Props = {
	fileName: string
	setIsReadyToPublish: Dispatch<SetStateAction<boolean>>
	isReadyToPublish: boolean
}

export const ProgressVideoProcessing: FC<Props> = ({ fileName, setIsReadyToPublish, isReadyToPublish }) => {
	const [progress, setProgress] = useState<number>(0)

	const { data: processingData, isSuccess } = useQuery({
		queryKey: ['processing video', fileName],
		queryFn: () => fileService.getProcessingStatus(fileName),
		select: ({ data }) => data.status,
		refetchInterval: query => {
			const queryProgress = query.state.data?.data
			return queryProgress !== undefined && queryProgress.status < 100 ? 3500 : false
		},
		enabled: !!fileName && !isReadyToPublish
	})

	useEffect(() => {
		if (!processingData) return
		setProgress(processingData)
		if (processingData === 100) {
			setIsReadyToPublish(true)
			const toasterFn = async () => {
				const { toast } = await import('react-hot-toast')
				toast.success('Video processed successfully!')
			}
			toasterFn()
		}
	}, [isSuccess, processingData, setIsReadyToPublish])

	return (
		progress > 0 && (
			<div
				className='flex items-center justify-center py-0.5 w-full relative rounded-md overflow-hidden text-sm font-medium mb-6'
				style={{
					backgroundColor: 'rgb(196 196 196 / 15%)'
				}}
			>
				<div
					className={`absolute inset-0 h-full bg-gradient-to-l from-gray-500 to-gray-600 ${!isReadyToPublish && 'animate-pulse'} transition-all`}
					style={{
						width: progress ? `${progress}%` : 0
					}}
				/>
				<span className='relative'>
					{isReadyToPublish ? 'Video processed! (100%)' : `Processing video (${Math.round(progress)}%)`}
				</span>
			</div>
		)
	)
}
