---
'@faustwp/core': minor
---

- Added support for configuring a custom sitemap index path via the `sitemapIndexPath` option in `getSitemapProps`, enhancing compatibility with plugins like RankMath that modify the default sitemap path.

  ```javascript
  import { getSitemapProps } from '@faustwp/core';

  export default function Sitemap() {}

  export function getServerSideProps(ctx) {
    return getSitemapProps(ctx, {
      sitemapIndexPath: '/sitemap_index.xml', // RankMath changes the default sitemap path to this
      frontendUrl: process.env.NEXT_PUBLIC_SITE_URL,
      sitemapPathsToIgnore: ['/wp-sitemap-users-*'],
    });
  }
  ```
