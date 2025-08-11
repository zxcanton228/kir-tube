'use client'

import cn from 'clsx'
import { type PropsWithChildren, useEffect, useState } from 'react'
import { authService } from 'src/services/auth/auth.service'

import { Content } from './content/Content'
import { Sidebar } from './sidebar/Sidebar'

import './Layout.scss'

export function Layout({ children }: PropsWithChildren<unknown>) {
	const [isShowedSidebar, setIsShowedSidebar] = useState<boolean>(true)

	const toggleSidebar = () => {
		setIsShowedSidebar(!isShowedSidebar)
	}
	useEffect(() => {
		authService.initializeAuth()
	}, [])

	return (
		<main className={cn('flex min-h-screen initialSidebar', isShowedSidebar ? 'showedSidebar' : 'hidedSidebar')}>
			<Sidebar
				isShowedSidebar={isShowedSidebar}
				toggleSidebar={toggleSidebar}
			/>
			<Content>{children}</Content>
		</main>
	)
}
