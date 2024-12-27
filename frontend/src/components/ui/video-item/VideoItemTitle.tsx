import Link from 'next/link'
import type { FC } from 'react'

import { PAGE } from 'src/config/public-page.config'

type Props = { publicId: string; title: string }
export const VideoItemTitle: FC<Props> = ({ publicId, title }) => (
	<Link
		href={PAGE.VIDEO(publicId)}
		className='line-clamp-2 leading-[1.3]'
	>
		<h3 title={title}>{title}</h3>
	</Link>
)
