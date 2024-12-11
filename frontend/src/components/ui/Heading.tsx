import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
	children: ReactNode
	Icon?: LucideIcon
	isH1?: boolean
	isPageHeading?: boolean
}

export const Heading = ({ Icon, children, isH1 = false, isPageHeading = false }: Props) => (
	<div
		className={cn('flex items-center opacity-90 ', {
			'gap-2.5 mb-6': isPageHeading,
			'gap-1.5 mb-4': !isPageHeading
		})}
	>
		{Icon && <Icon className='text-primary' />}
		{isH1 || isPageHeading ? (
			<h1
				className={cn('font-semibold text-lg', {
					'text-3xl': isPageHeading,
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
