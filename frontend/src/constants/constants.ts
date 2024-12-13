export const API_URL: string = process.env.NEXT_PUBLIC_SERVER_URL as string,
	CLIENT_URL: string = process.env.NEXT_PUBLIC_CLIENT_URL as string,
	IS_CLIENT = typeof window !== 'undefined'
