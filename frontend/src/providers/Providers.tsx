'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from 'src/store'

export const Providers = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: 1
					},
					mutations: {
						retry: 1
					}
				}
			})
	)
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<LazyMotion features={domAnimation}>
					{children}
					<Toaster toastOptions={{ style: { backgroundColor: '#202937', color: 'white' } }} />
				</LazyMotion>
			</Provider>
		</QueryClientProvider>
	)
}
