---
'@faustjs/core': minor
'@faustjs/next': minor
'@faustjs/react': minor
---

`headlessConfig` from `@faustjs/core` is now just `config`, and `@faustjs/next` has its own `config` with a global revalidate option.

Your `faust.config.js` needs to change to look like this:

```ts
import { config as coreConfig } from '@faustjs/core';

if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  console.error(
    'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env.local file?',
  );
}

/**
 * @type {import("@faustjs/core").Config}
 */
export default coreConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});
```

Or, to configure the global `revalidate` option in `@faustjs/next`:


```ts
import { config as coreConfig } from '@faustjs/core';
import { config as nextConfig } from '@faustjs/next';

if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  console.error(
    'You must provide a NEXT_PUBLIC_WORDPRESS_URL environment variable, did you forget to load your .env.local file?',
  );
}

nextConfig({
  revalidate: 60, // 1 minute
});

/**
 * @type {import("@faustjs/core").Config}
 */
export default coreConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});
```

> **NOTE**: `@faustjs/next` defaults to `revalidate: 900` (15 minutes).
