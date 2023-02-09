---
'@faustwp/core': patch
---

Implemented `getSitemapProps` from old Faust for sitemap supported! `getSitemapProps` in new Faust has less config that is required. To get started, create `pages/sitemap.xml.js` with the following content:

```jsx
import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(context) {
  return getSitemapProps(context, {
    frontendUrl: process.env.FRONTEND_URL, // Set the FRONTEND_URL as an env var
  });
}
```

For more information, visit the [sitemaps guide](https://faustjs.org/docs/guides/sitemaps) or the [`getSitemapProps` reference doc](https://faustjs.org/docs/reference/getSitemapProps)
