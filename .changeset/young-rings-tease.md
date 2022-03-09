---
'@faustjs/next': patch
---

Added support for sitemaps! Sitemaps in Faust.js work with Next.js middleware. You can create a piece of middleware at `src/pages/_middleware.ts` with the following content:

```ts
import { handleSitemapRequests } from '@faustjs/next/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const sitemapRequest = await handleSitemapRequests(req, {
    wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    sitemapIndexPath: '/wp-sitemap.xml',
  });

  if (sitemapRequest) {
    return sitemapRequest;
  }

  return NextResponse.next();
}
```

The `handleSitemapRequests` API requires `wpUrl` and `sitemapIndexPath` to be defined. There is optional properties you can define to suit your needs. The config is as follows:

```ts
import { handleSitemapRequests } from '@faustjs/next';

handleSitemapRequests(middlewareReq, {
  // REQUIRED: Your WordPress URL
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  // REQUIRED: The path to your sitemap index file on WordPress
  sitemapIndexPath: '/wp-sitemap.xml',
  /**
   * OPTIONAL: Sitemap paths to ignore. Useful if you don't want to include sitemaps for users, categories, etc.
   */
  sitemapPathsToIgnore: [
    '/wp-sitemap-posts-page-1.xml',
    '/wp-sitemap-posts-post-*', // Specify a wildcard a tthe end to avoid multiple indices if necessary
  ],
  /**
   * OPTIONAL: List of Next.js pages to include in your sitemap.
   */
  pages: [
    {
      path: '/about', // required
      priority: 0.75, // optional
      changefreq: 'monthly', // optional
      lastmod: new Date().toISOString(), // optional
    },
  ],
  /**
   * OPTIONAL: Replace WP urls with the headless frontend. `true` by default.
   */
  replaceUrls: true,
});
```
