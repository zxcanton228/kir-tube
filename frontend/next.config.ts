import type { NextConfig } from 'next'

// type TProtocol = 'https' | 'http'
const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	sassOptions: {
		silenceDeprecations: ['legacy-js-api']
	},
	devIndicators: {
		appIsrStatus: false
	},

	rewrites: async () => [
		{
			source: '/uploads/:path*',
			destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/:path*`.replace('/api', '')
		}
	]
}

export default nextConfig
