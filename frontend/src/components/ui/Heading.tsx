import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	children: ReactNode
	Icon?: LucideIcon
	isH1?: boolean
	isPageHeading?: boolean
	className?: string
}

export const Heading = ({ Icon, children, isH1 = false, isPageHeading = false, className }: Props) => (
	<div className={twMerge(`flex items-center opacity-90 ${isPageHeading ? 'gap-2.5 mb-6' : 'gap-1.5 mb-4'}`, className)}>
		{Icon && <Icon className='text-primary' />}
		{isH1 || isPageHeading ? (
			<h1
				className={cn('font-semibold text-lg', {
					'text-[2rem]': isPageHeading,
					'text-lg': !isPageHeading
				})}
			>
				{children}
			</h1>
		) : (
			<h2 className='font-semibold text-lg'>{children}</h2>
		)}
	</div>
)
