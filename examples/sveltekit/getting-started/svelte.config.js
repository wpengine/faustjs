/** @type {import('@sveltejs/kit').Config} */

import node from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

export default {
	preprocess: preprocess(),
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: node(),
		vite: {
			resolve: {
				alias: {}
			}
		},
		trailingSlash: 'always'
	}
};
