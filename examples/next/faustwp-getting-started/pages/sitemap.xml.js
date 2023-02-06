import { getSitemapProps } from '@faustwp/core';

export default function Sitemap() {}

export function getServerSideProps(context) {
  return getSitemapProps(context, {
    frontendUrl: 'http://localhost:3000/',
    sitemapPathsToIgnore: ['/author-sitemap.xml', '/post_tag-sitemap.xml'],
  });
}
