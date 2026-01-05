---
'@faustwp/core': minor
---

Feat: Added support `next/dynamic` imports for templates to reduce initial bundle size in a way that's backwards compatible with static imports.

This solves a known issue in Faust where all defined templates are bundled together and loaded on every WordPress page. by enabling the use of dynamic importing of templates this issue is resolved. Now templates are only loaded as needed per route.

It's recommended you migrate to dynamic imports by updating your template file. Here's an example:

```js title=src/wp-templates/index.js
// Old Static Templates
import category from './category';
import tag from './tag';
import frontPage from './front-page';
import page from './page';
import single from './single';

export default {
	category,
	tag,
	'front-page': frontPage,
	page,
	single,
};

// New Dynamic Templates
import dynamic from 'next/dynamic';

const category = dynamic(() => import('./category.js'));
const tag = dynamic(() => import('./tag.js'));
const frontPage = dynamic(() => import('./front-page.js'));
const page = dynamic(() => import('./page.js'));

// The above examples assume use of default exports. If you are using named exports you'll need to handle that:
const single = dynamic(() => import('./single.js').then(mod => mod.Single));

export default {
	category,
	tag,
	'front-page': frontPage,
	page,
	single,
};
```

For further info see the Next.js docs on the use of [`next/dynamic`](https://nextjs.org/docs/pages/guides/lazy-loading#nextdynamic-1).
