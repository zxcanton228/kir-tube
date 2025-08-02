import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,

	rewrites: async () => [
		{
			source: '/uploads/:path*',
			destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/uploads/:path*`.replace('/api', '')
		}
	]
}

export default nextConfig
