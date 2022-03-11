---
'@faustjs/next': patch
---

Added the `robotsTxt` config option in `handleSitemapRequests` that allows you to specify the content of your `/robots.txt` route. You can use the following snippet to create a `/robots.txt` route:

```tsx
handleSitemapRequests(req, {
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  sitemapIndexPath: '/wp-sitemap.xml',
  async robotsTxt(sitemapUrl) {
    return `
        User-agent: *
        Allow: /

        Sitemap: ${sitemapUrl}
      `;
  },
});
```

Notice `robotsTxt` is an async function that takes `sitemapUrl` as an argument. `sitemapUrl` can then be used to specify the URL to your sitemap in your robots.txt content.
