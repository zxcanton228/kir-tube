import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	isLoading?: boolean
}

export function Button({ children, isLoading, ...props }: Props) {
	return (
		<button
			className='py-2 px-10 bg-primary text-white font-semibold rounded hover:bg-red-400 transition-color disabled:bg-gray-400'
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? 'Loading...' : children}
		</button>
	)
}
