'use client'

import { AnimatePresence } from 'framer-motion'
import parse from 'html-react-parser'
import { type FC, useState } from 'react'

import { processHtmlContent } from 'src/utils/process-html-content'

import styles from './VideoDescription.module.scss'

export const VideoDescription: FC<{ description: string }> = ({ description }) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false)
	const { initialContent, isShouldShowToggle } = processHtmlContent(description, 3)
	return (
		<div className='relative mb-4 bg-gray-800 px-3 py-1.5 rounded-lg'>
			<AnimatePresence initial={false}>
				<article className={styles.article}>{parse(isExpanded ? description : initialContent)}</article>
			</AnimatePresence>
			{isShouldShowToggle && (
				<button
					onClick={() => setIsExpanded(prev => !prev)}
					className='text-gray-400 uppercase transition-colors hover:text-gray-200 mt-2'
				>
					{isExpanded ? 'Hide' : 'Show more'}
				</button>
			)}
		</div>
	)
}
