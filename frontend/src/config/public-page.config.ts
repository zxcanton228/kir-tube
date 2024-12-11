class PublicPage {
	public readonly HOME: string = '/'
	public readonly AUTH: string = '/auth'
	public readonly TRENDING: string = '/trending'
	public readonly VIDEO_GAMES: string = '/video-games'

	public readonly SEARCH = (term: string): string => `/s?term=${term}`

	public readonly MY_CHANNEL: string = '/my-channel'
	public readonly SUBSCRIPTIONS: string = '/subscriptions'
	public readonly HISTORY: string = '/history'
	public readonly LIKED_VIDEOS: string = '/liked-videos'

	public readonly FEEDBACK: string = '/feedback'

	public readonly VIDEO = (path: string): string => `/v/${path}`
	public readonly CHANNEL = (path: string): string => `/c/${path}`
}

export const PAGE = new PublicPage()
