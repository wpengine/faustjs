import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(ctx) {
  return getSitemapProps(ctx, {
    // sitemapIndexPath: '/sitemap_index.xml', // Update the sitemap path if a WordPress plugin is used that changes the default path.
    frontendUrl: process.env.NEXT_PUBLIC_SITE_URL,
    sitemapPathsToIgnore: ['/wp-sitemap-users-*'],
  });
}
