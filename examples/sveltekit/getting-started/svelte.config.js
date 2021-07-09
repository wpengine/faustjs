/** @type {import('@sveltejs/kit').Config} */

import node from '@sveltejs/adapter-node';


export default {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter:  node(),
		vite: {
      resolve: {
        alias: {
        },
      },
    },
		trailingSlash: "always",
	}
};

