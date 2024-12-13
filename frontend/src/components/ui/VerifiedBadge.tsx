import { BadgeCheck } from 'lucide-react'

export const VerifiedBadge = ({ size = 15 }: { size?: number }) => (
	<span>
		<BadgeCheck
			className='text-green-500'
			size={size}
		/>
	</span>
)
