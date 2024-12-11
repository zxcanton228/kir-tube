import Link, { type LinkProps } from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type TLink = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
type Props = {
	children: ReactNode
	isLoading?: boolean
} & TLink

export function LinkButton({ children, isLoading, ...props }: Props) {
	return (
		<Link
			className='py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-red-400 transition-color disabled:bg-gray-400 flex gap-2 items-center'
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</Link>
	)
}
