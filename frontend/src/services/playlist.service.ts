import type { IPlaylist, IPlaylistData } from 'src/types/playlist.types'

import { instance } from 'src/api/axios'

class PlaylistService {
	private readonly _PLAYLISTS = '/playlists'

	public readonly getUserPlaylists = () => instance.get<IPlaylist[]>(this._PLAYLISTS)

	public readonly getPlaylistById = (playlistId: string) => instance.get<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`)

	public readonly toggleVideoInPlaylist = (playlistId: string, videoId: string) =>
		instance.post(`${this._PLAYLISTS}/${playlistId}/toggle-video`, {
			videoId
		})

	public readonly createPlaylist = (playlist: IPlaylistData) => instance.post(this._PLAYLISTS, playlist)
}

export const playlistService = new PlaylistService()
