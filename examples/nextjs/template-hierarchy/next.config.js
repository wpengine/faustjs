const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		esmExternals: true,
	},
	transpilePackages: ['@faustjs/nextjs'],
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, 'src'),
		};
		return config;
	},
};

module.exports = nextConfig;
