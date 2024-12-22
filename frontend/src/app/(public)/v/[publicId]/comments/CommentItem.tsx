'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, useState } from 'react'
import type { IComment } from 'src/types/comment.types'

import { PAGE } from 'src/config/public-page.config'

import { useAuth } from 'src/hooks/useAuth'

import { transformDate } from 'src/utils/transform-date'

import { Heading } from 'ui/Heading'
import { VerifiedBadge } from 'ui/VerifiedBadge'

import getInitials from './get-initials'

const DynamicCommentActions = dynamic(() => import('./CommentActions').then(mod => mod.CommentActions), { ssr: false })

type Props = { comment: IComment; refetch: () => void }
export const CommentItem: FC<Props> = ({ comment, refetch }) => {
	const [text, setText] = useState<string>(comment.text)
	const { user } = useAuth()
	return (
		<div className='flex gap-3.5 items-start py-5 border-b border-b-border/5 last:border-none'>
			{comment.user?.channel ? (
				<Link href={PAGE.CHANNEL(comment?.user?.channel?.slug || '')}>
					<Image
						alt={comment.user.name || ''}
						src={comment.user.channel?.avatarUrl || '/avatar.png'}
						width={40}
						height={40}
						quality={50}
						className='rounded-lg flex-shrink-0 shadow'
					/>
				</Link>
			) : (
				<div className='w-10 h-10 text-xl font-medium bg-gray-700 text-gray-900 flex items-center justify-center rounded-lg flex-shrink-0 shadow select-none'>
					{getInitials(comment.user.name || 'Anonym')}
				</div>
			)}
			<div>
				<div className='flex items-center gap-3 mb-2'>
					<Heading
						className='mb-0'
						classNameHeading='text-base'
					>
						<span className='flex items-center gap-2'>
							{comment.user.name}
							{comment.user.channel?.isVerified && <VerifiedBadge size={14} />}
						</span>
					</Heading>

					<div className='text-gray-500 text-xs'>{transformDate(comment.createdAt)}</div>
				</div>
				<div>
					{user?.id !== comment.user.id ? (
						comment.text
					) : (
						<textarea
							className='text-gray-300 text-sm leading-snug bg-transparent resize-none focus:border-border border border-transparent outline-none border-none w-full'
							value={text}
							onChange={e => setText(e.target.value)}
						/>
					)}
				</div>
				<DynamicCommentActions
					newText={text}
					refetch={refetch}
					comment={comment}
				/>
			</div>
		</div>
	)
}
