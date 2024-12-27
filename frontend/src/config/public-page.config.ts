//eslint-disable-next-line
type TULink = (path: string) => string
class UniqPages {
	public readonly SEARCH: TULink = term => `/s?term=${term}`
	public readonly VIDEO: TULink = path => `/v/${path}`
	public readonly PLAYLISTS = (path?: string | number): string => `/playlists${path ? `/${path}` : ''}`
	public readonly CHANNEL: TULink = path => `/c/${path}`
}
class PublicPage extends UniqPages {
	public readonly HOME: string = '/'
	public readonly AUTH: string = '/auth'
	public readonly TRENDING: string = '/trending'
	public readonly VIDEO_GAMES: string = '/video-games'

	public readonly MY_CHANNEL: string = '/my-channel'
	public readonly SUBSCRIPTIONS: string = '/subscriptions'
	public readonly HISTORY: string = '/history'
	public readonly LIKED_VIDEOS: string = '/liked-videos'

	public readonly FEEDBACK: string = '/feedback'
}

export const PAGE = new PublicPage()
