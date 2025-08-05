import type { MetadataRoute } from 'next'
import channelService from 'src/services/channel.service'
import { videoService } from 'src/services/video.service'

import { SITE_URL } from 'src/constants/constants'

import { PAGE } from 'src/config/public-page.config'

async function getVideos() {
	const { videos } = await videoService.getAll()
	const data: MetadataRoute.Sitemap = []

	for (const video of videos) {
		data.push({
			url: `${SITE_URL}${PAGE.VIDEO(video.publicId)}`,
			lastModified: new Date(video.updatedAt).toISOString(),
			changeFrequency: 'daily',
			priority: 0.8
		})
	}

	return data
}
async function getChannels() {
	const { data: channels } = await channelService.getAll()
	const data: MetadataRoute.Sitemap = []

	for (const channel of channels) {
		data.push({
			url: `${SITE_URL}${PAGE.CHANNEL(channel.slug || channel.id)}`,
			lastModified: new Date(channel.updatedAt).toISOString(),
			changeFrequency: 'daily',
			priority: 0.8
		})
	}

	return data
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const videosFields = await getVideos()
	const channelsFields = await getChannels()

	return [
		{
			url: SITE_URL + PAGE.HOME,
			lastModified: new Date().toISOString(),
			changeFrequency: 'weekly',
			priority: 1
		},
		{
			url: SITE_URL + PAGE.FEEDBACK,
			lastModified: new Date().toISOString(),
			changeFrequency: 'never',
			priority: 1
		},
		{
			url: SITE_URL + PAGE.TRENDING,
			lastModified: new Date().toISOString(),
			changeFrequency: 'daily',
			priority: 1
		},
		{
			url: SITE_URL + PAGE.VIDEO_GAMES,
			lastModified: new Date().toISOString(),
			changeFrequency: 'daily',
			priority: 1
		},
		{
			url: SITE_URL + PAGE.CHANNEL,
			lastModified: new Date().toISOString(),
			changeFrequency: 'daily',
			priority: 1
		},
		...videosFields,
		...channelsFields
	]
}
