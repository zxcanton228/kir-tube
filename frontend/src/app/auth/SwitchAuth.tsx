import type { Dispatch, FC, SetStateAction } from 'react'

type Props = {
	isLogin: boolean
	setIsLogin: Dispatch<SetStateAction<boolean>>
}
export const SwitchAuth: FC<Props> = ({ isLogin, setIsLogin }) => (
	<section className='flex justify-center mb-6'>
		<button
			type='button'
			className={`px-4 py-2 font-semibold ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
			onClick={() => setIsLogin(true)}
		>
			Login
		</button>
		<button
			type='button'
			className={`px-4 py-2 font-semibold ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
			onClick={() => setIsLogin(false)}
		>
			Register
		</button>
	</section>
)
