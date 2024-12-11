import { Check } from 'lucide-react'

export default function VerifiedPage() {
	return (
		<div className='mx-auto mx-1/2 mt-24 text-center'>
			<h1 className='font-semibold text-5xl mb-5 gap-2 items-center inline-flex'>
				<Check
					size={60}
					className='text-green-500'
				/>
				<span>Email successfully verified!</span>
			</h1>
		</div>
	)
}
