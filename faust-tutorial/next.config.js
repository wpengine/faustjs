const { createSecureHeaders } = require('next-secure-headers');
const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
	reactStrictMode: true,
	sassOptions: {
		includePaths: ['node_modules'],
	},
	images: {
		domains: [getWpHostname()],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: createSecureHeaders({
					xssProtection: false,
				}),
			},
		];
	},
});
