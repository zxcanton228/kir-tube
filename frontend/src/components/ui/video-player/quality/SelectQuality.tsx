'use client'

import cn from 'clsx'
import { AnimatePresence } from 'framer-motion'
import * as m from 'framer-motion/m'
import type { FC } from 'react'

import { useOutside } from 'src/hooks/useOutside'

import type { EnumVideoPlayerQuality } from '../video-player.types'

import { VIDEO_QUALITIES } from './quality.data'

type Props = {
	currentValue: EnumVideoPlayerQuality
	onChange: (quality: EnumVideoPlayerQuality) => void
	maxResolution: EnumVideoPlayerQuality
}

export const SelectQuality: FC<Props> = ({ currentValue, onChange, maxResolution }) => {
	const { isShow, ref, setIsShow } = useOutside(false)
	const availableQualities = VIDEO_QUALITIES.slice(VIDEO_QUALITIES.indexOf(maxResolution))
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
			bg-gray-800/90 py-2 px-4 rounded absolute bottom-full right-0 z-[105%] shadow'
					>
						{availableQualities.map(quality => (
							<li key={quality}>
								<button
									className={cn('mb-1', {
										'transition-colors hover:text-primary': quality !== currentValue,
										'text-primary': quality === currentValue
									})}
									disabled={quality === currentValue}
									onClick={() => {
										onChange(quality)
										setIsShow(false)
									}}
								>
									{quality}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
