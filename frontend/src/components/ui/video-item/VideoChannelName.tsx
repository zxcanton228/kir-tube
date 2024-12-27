import Link from 'next/link'
import type { FC } from 'react'
import type { IChannel } from 'src/types/channel.types'
import { twMerge } from 'tailwind-merge'

import { PAGE } from 'src/config/public-page.config'

import { VerifiedBadge } from 'ui/VerifiedBadge'

type Props = { channel: IChannel; spanClassName?: string }
export const VideoChannelName: FC<Props> = ({ channel, spanClassName }) => (
	<Link
		href={PAGE.CHANNEL(channel.slug)}
		className='flex items-center gap-1'
	>
		<span className={twMerge('text-gray-400 text-sm', spanClassName)}>{channel.user.name}</span>
		{channel.isVerified && <VerifiedBadge />}
	</Link>
)
