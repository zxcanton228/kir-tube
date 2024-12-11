import { useRouter } from 'next/navigation'
import { type KeyboardEvent, useState } from 'react'

import { PAGE } from 'src/config/public-page.config'

export const SearchField = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const router = useRouter()

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return
		e.preventDefault()
		if (searchTerm.trim() !== '') router.push(PAGE.SEARCH(encodeURIComponent(searchTerm)))
	}

	return (
		<search
			typeof='search'
			className='w-1/3'
		>
			<input
				type='search'
				placeholder='Type to Search'
				className='py-2 px-4 bg-transparent outline-none border-none shadow-none w-4/6'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</search>
	)
}
