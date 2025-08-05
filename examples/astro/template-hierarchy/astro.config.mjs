import { defineConfig } from 'astro/config';

export default defineConfig({
	output: 'server',
	// Enable SSR for dynamic WordPress content
	vite: {
		resolve: {
			alias: {
				'@': '/src',
			},
		},
	},
});
