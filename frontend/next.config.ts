import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	sassOptions: {
		silenceDeprecations: ['legacy-js-api']
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
}

export default nextConfig
