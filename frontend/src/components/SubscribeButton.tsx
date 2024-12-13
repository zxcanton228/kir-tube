'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import channelService from 'src/services/channel.service'

import { PAGE } from 'src/config/public-page.config'

import { useProfile } from 'src/hooks/useProfile'

import { Button } from 'ui/button/Button'

export const SubscribeButton = ({ slug }: { slug: string }) => {
	const { profile, refetch } = useProfile()
	const router = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['subscribe'],
		mutationFn: () => channelService.toggleSubscribe(slug),
		onSuccess: () => {
			refetch()
		}
	})
	const clickHandler = () => {
		if (profile) {
			mutate()
		} else {
			router.push(PAGE.AUTH)
		}
	}
	const isSub = profile?.subscriptions.some(sub => sub.slug === slug)
	return (
		<Button
			onClick={clickHandler}
			variant={isSub ? 'secondary' : 'primary'}
		>
			{isPending ? 'Subscribing...' : isSub ? 'Subscribed' : 'Subscribe'}
		</Button>
	)
}
