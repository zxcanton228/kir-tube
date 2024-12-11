'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from 'src/store'

export const Providers = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<LazyMotion features={domAnimation}>
					{children}
					<Toaster />
				</LazyMotion>
			</Provider>
		</QueryClientProvider>
	)
}
