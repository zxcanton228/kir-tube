import { useQuery } from '@tanstack/react-query'
import { userService } from 'src/services/studio/user.service'

export function useProfile() {
	const { data, isLoading, isFetching, isPending, isRefetching, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		refetchInterval: 1800000 // 30 minutes
	})
	return { profile: data?.data, isLoading: isFetching || isPending || isRefetching || isLoading, isSuccess, refetch }
}
