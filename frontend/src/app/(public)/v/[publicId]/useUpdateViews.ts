import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { videoService } from 'src/services/video.service'
import { watchHistoryService } from 'src/services/watch-history.service'

export function useUpdateViews(publicId: string, id: string) {
	const { mutate: updateViews } = useMutation({
		mutationKey: ['update-views', publicId],
		mutationFn: async () => videoService.updateViews(publicId),
		throwOnError: true
	})
	const { mutate: updateWatchHistory } = useMutation({
		mutationKey: ['update-watch-history', id],
		mutationFn: async () => watchHistoryService.addToHistory(id),
		throwOnError: true
	})
	useEffect(() => {
		updateViews()
		updateWatchHistory()
	}, [updateViews, updateWatchHistory])
}
