import 'isomorphic-fetch';
import * as sitemapUtils from '../../../src/middleware/sitemaps/sitemapUtils';
describe('createSitemapIndex()', () => {
  it('returns a sitemap index with no sitemaps', async () => {
    const sitemaps: sitemapUtils.SitemapSchemaSitemapElement[] = [];
    const res = sitemapUtils.createSitemapIndex(sitemaps);

    const xml = await res.text();

    expect(res.headers.get('Content-Type')).toBe('application/xml');
    expect(xml).toMatchSnapshot();
  });

  it('returns a sitemap index with specified sitemaps', async () => {
    const sitemaps: sitemapUtils.SitemapSchemaSitemapElement[] = [
      {
        loc: 'http://localhost:3000/post-sitemap.xml',
        lastmod: '2022-01-01',
      },
      {
        loc: 'http://localhost:3000/page-sitemap.xml',
      },
    ];

    const res = sitemapUtils.createSitemapIndex(sitemaps);

    const xml = await res.text();

    expect(res.headers.get('Content-Type')).toBe('application/xml');
    expect(xml).toMatchSnapshot();
  });
});

describe('createSitemap()', () => {
  it('returns a sitemap with no links', async () => {
    const urls: sitemapUtils.SitemapSchemaUrlElement[] = [];
    const res = sitemapUtils.createSitemap(urls);

    const xml = await res.text();

    expect(res.headers.get('Content-Type')).toBe('application/xml');
    expect(xml).toMatchSnapshot();
  });

  it('returns a sitemap with specified urls', async () => {
    const urls: sitemapUtils.SitemapSchemaUrlElement[] = [
      {
        loc: 'http://localhost:3000/',
        lastmod: '2022-01-01',
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: 'http://localhost:3000/about',
        lastmod: '2022-01-01',
      },
      {
        loc: 'http://localhost:3000/contact',
        priority: 0.4,
      },
      {
        loc: 'http://localhost:3000/team',
        changefreq: 'monthly',
      },
      {
        loc: 'http://localhost:3000/blog',
      },
    ];
    const res = sitemapUtils.createSitemap(urls);

    const xml = await res.text();

    expect(res.headers.get('Content-Type')).toBe('application/xml');
    expect(xml).toMatchSnapshot();
  });
});
