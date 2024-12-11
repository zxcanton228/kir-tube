import type { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	count?: number
	style?: CSSProperties
	className?: string
}

export const SkeletonLoader = ({ count = 1, className = '', style }: Props) => {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<div
					className={twMerge('bg-slate-800 rounded-sm h-10 mb-2.5 animate-pulse', className)}
					style={style}
					key={i}
				/>
			))}
		</>
	)
}
