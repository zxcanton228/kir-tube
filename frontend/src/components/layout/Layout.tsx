'use client'

import cn from 'clsx'
import { type PropsWithChildren, useState } from 'react'

import { Content } from './content/Content'
import { Sidebar } from './sidebar/Sidebar'

import styles from './Layout.module.scss'

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
	const [isShowedSidebar, setIsShowedSidebar] = useState<boolean>(true)
	const toggleSidebar = () => {
		setIsShowedSidebar(s => !s)
	}
	return (
		<main
			className={cn(
				'flex min-h-screen',
				isShowedSidebar ? styles.showedSidebar : styles.hidedSidebar
			)}
		>
			<Sidebar toggleSidebar={toggleSidebar} />
			<Content>{children}</Content>
		</main>
	)
}
