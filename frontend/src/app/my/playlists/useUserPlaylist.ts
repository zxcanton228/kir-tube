import { useQuery } from '@tanstack/react-query'
import { playlistService } from 'src/services/playlist.service'

export const useUserPlaylists = () =>
	useQuery({
		queryKey: ['playlists'],
		queryFn: () => playlistService.getUserPlaylists()
	})
