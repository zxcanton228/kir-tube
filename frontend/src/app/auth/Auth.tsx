'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Logo } from 'src/components/layout/sidebar/header/Logo'

import { SkeletonLoader } from 'ui/SkeletonLoader'
import { Button } from 'ui/button/Button'
import { Field } from 'ui/field/Field'

import { Recaptcha } from './Recaptcha'
import { SwitchAuth } from './SwitchAuth'
import type { IAuthForm } from './auth-form.types'
import { useAuthForm } from './useAuthForm'

export function Auth() {
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>({ mode: 'onChange' })

	const { isLoading, onSubmit, recaptchaRef } = useAuthForm(isLogin ? 'login' : 'register', reset)

	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<div className='w-1/6 p-layout border-border border rounded'>
				<header className='w-full text-center mb-1'>
					<Logo />
				</header>

				<SwitchAuth
					isLogin={isLogin}
					setIsLogin={setIsLogin}
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					{isLoading ? (
						<SkeletonLoader
							count={3}
							className='w-full h-10'
						/>
					) : (
						<>
							<Field
								label='Email'
								type='email'
								registration={register('email', {
									required: 'Email is required!',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address'
									}
								})}
								error={errors.email?.message}
								placeholder='Enter email:'
							/>
							<Field
								label='Password'
								type='password'
								registration={register('password', {
									required: 'Password is required!',
									minLength: { value: 6, message: 'Min length should be more than 6 symbols' }
								})}
								error={errors.password?.message}
								placeholder='Enter password:'
							/>
							{!isLogin && (
								<Field
									label='Password confirmation'
									type='password'
									registration={register('confirmPassword', {
										required: 'Password confirmation is required!',
										validate: value => value === watch('password') || 'Passwords don`t match!'
									})}
									error={errors.confirmPassword?.message}
									placeholder='Enter password again:'
								/>
							)}
							<Recaptcha forwardRef={recaptchaRef} />
						</>
					)}
					<div className='text-center mt-6'>
						<Button
							isLoading={isLoading}
							type='submit'
						>
							{isLogin ? 'Login' : 'Register'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
