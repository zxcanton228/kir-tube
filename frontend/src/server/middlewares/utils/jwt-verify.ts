'use server'

import * as jose from 'jose'

interface ITokenInside {
	id: string
	iat: number
	exp: number
}

export async function jwtVerifyServer(accessToken: string) {
	try {
		// Проверяем токен на валидность
		const { payload }: { payload: ITokenInside } = await jose.jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)
		return payload
	} catch (error) {
		// Обработка ошибок, связанных с верификацией JWT
		if (error instanceof Error && error.message.includes('exp claim timestamp check failed')) {
			console.error('Token expired')
			return null
		}

		console.error('Ошибка при верификации токена: ', error)
		return null
	}
}
