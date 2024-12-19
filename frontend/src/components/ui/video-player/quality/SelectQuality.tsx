'use client'

import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import type { FC } from 'react'

import { useOutside } from 'src/hooks/useOutside'

import type { EnumVideoPlayerQuality } from '../video-player.types'

import { VIDEO_QUALITIES } from './quality.data'

type Props = {
	currentValue: EnumVideoPlayerQuality
	onChange: (quality: EnumVideoPlayerQuality) => void
}
export const SelectQuality: FC<Props> = ({ currentValue, onChange }) => {
	const { isShow, ref, setIsShow } = useOutside(false)

	return (
		<div
			className='relative'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(s => !s)}
				className='transition-colors hover:text-primary'
			>
				{currentValue}
			</button>
			<AnimatePresence initial={false}>
				{isShow && (
					<m.ul
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='
			bg-white/10 py-2 px-4 rounded absolute bottom-full right-0 z-10 shadow'
					>
						{VIDEO_QUALITIES.map(quality =>
							quality === currentValue ? null : (
								<li key={quality}>
									<button
										className='mb-1 transition-colors hover:text-primary'
										onClick={() => {
											onChange(quality)
											setIsShow(false)
										}}
									>
										{quality}
									</button>
								</li>
							)
						)}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
