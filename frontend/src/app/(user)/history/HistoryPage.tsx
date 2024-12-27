'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { History } from 'lucide-react'
import toast from 'react-hot-toast'
import { watchHistoryService } from 'src/services/watch-history.service'

import { Heading } from 'ui/Heading'
import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Button } from 'ui/button/Button'
import { HorizontalVideoItem } from 'ui/video-item/HorizontalVideoItem'

export function HistoryPage() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['watchHistory'],
		queryFn: () => watchHistoryService.getUserHistory()
	})
	const { mutate, isPending } = useMutation({
		mutationKey: ['clearHistory'],
		mutationFn: () => watchHistoryService.clearHistory(),
		onSuccess: () => {
			refetch()
			toast.success('History cleared!')
		}
	})

	const isHistoryEmpty = !data?.data?.length

	return (
		<div className='w-1/2'>
			<div className='flex items-center justify-between mb-10'>
				<Heading
					isPageHeading
					Icon={History}
					className='m-0'
				>
					History
				</Heading>

				{!isHistoryEmpty && (
					<Button
						variant='simple'
						isLoading={isPending}
						onClick={() => mutate()}
					>
						Clear history
					</Button>
				)}
			</div>

			<div className='flex flex-col gap-6'>
				{isLoading ? (
					<SkeletonLoader
						count={6}
						className='h-36 rounded-md'
					/>
				) : !isHistoryEmpty ? (
					data.data.map(history => (
						<HorizontalVideoItem
							key={history.video.id}
							video={history.video}
						/>
					))
				) : (
					<p className='w-full'>You have not watched any videos.</p>
				)}
			</div>
		</div>
	)
}
