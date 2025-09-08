import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	output: 'server',
	// Enable SSR for dynamic WordPress content
	vite: {
		resolve: {
			alias: {
				'@': '/src',
			},
		},
		server: {
			watch: {
				// Explicitly watch the packages directories
				ignored: [
					'**/node_modules/**',
					'!**/node_modules/@faustjs/**', // Watch @faustjs packages
				],
				followSymlinks: true,
			},
		},
		optimizeDeps: {
			// Don't pre-bundle workspace packages so changes are picked up immediately
			exclude: [
				'@faustjs/astro',
				'@faustjs/template-hierarchy',
				'@faustjs/graphql',
			],
		},
		plugins: [tailwindcss()],
	},
});
