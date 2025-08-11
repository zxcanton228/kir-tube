import { useQuery } from '@tanstack/react-query'
import { userService } from 'src/services/studio/user.service'

export function useProfile() {
	const { data, isSuccess, isLoading, isFetching, isPending, isRefetching, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		refetchInterval: 1800000, // 30 minutes,
		retry: 2
	})

	const profile = data?.data
	const isLoadings = isFetching || isPending || isRefetching || isLoading

	return { profile, isLoading: isLoadings, isSuccess, refetch }
}
