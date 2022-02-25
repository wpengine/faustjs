import { config as coreConfig } from '@faustjs/core';
import { XMLParser } from 'fast-xml-parser';
import { trim, trimEnd } from 'lodash';
import defaults from 'lodash/defaults.js';
import isArray from 'lodash/isArray.js';
import isUndefined from 'lodash/isUndefined.js';
import { NextRequest } from 'next/server.js';

/**
 * TypeScript representation of the "URL" element from the Sitemap
 * schema
 *
 * @link https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
 */
export interface SitemapSchemaUrlElement {
  /**
   * The location URI of a document. The URI must conform to RFC 2396 (http://www.ietf.org/rfc/rfc2396.txt).
   */
  loc: string;
  /**
   * The date the document was last modified. The date must conform to the
   * W3C DATETIME format (http://www.w3.org/TR/NOTE-datetime).
   * Example: 2005-05-10
   * Lastmod may also contain a timestamp. Example: 2005-05-10T17:33:30+08:00
   */
  lastmod?: string;
  /**
   * Indicates how frequently the content at a particular URL is likely
   * to change. The value "always" should be used to describe documents that
   * change each time they are accessed. The value "never" should be used to
   * describe archived URLs. Please note that web crawlers may not necessarily
   * crawl pages marked "always" more often. Consider this element as a
   * friendly suggestion and not a command.
   */
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  /**
   * The priority of a particular URL relative to other pages on the same site.
   * The value for this element is a number between 0.0 and 1.0
   * where 0.0 identifies the lowest priority page(s). The default priority of
   * a page is 0.5. Priority is used to select between pages on your site.
   * Setting a priority of 1.0 for all URLs will not help you, as the relative
   * priority of pages on your site is what will be considered.
   */
  priority?: number;
}

/**
 * TypeScript representation of the "sitemap" element from the
 * siteindex schema
 *
 * @link https://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd
 */
export interface SitemapSchemaSitemapElement {
  /**
   * The location URI of a sitemap. The URI must conform to RFC 2396 (http://www.ietf.org/rfc/rfc2396.txt).
   */
  loc: string;
  /**
   * The date the document was last modified. The date must conform to the
   * W3C DATETIME format (http://www.w3.org/TR/NOTE-datetime). Example: 2005-05-10
   * Lastmod may also contain a timestamp. Example: 2005-05-10T17:33:30+08:00
   */
  lastmod?: string;
}

export interface NextJSPage extends Omit<SitemapSchemaUrlElement, 'loc'> {
  /**
   * The relative URL of the Next.js page.
   */
  path: string;
}

export interface ProxySitemapRequestsConfig {
  /**
   * A list of sitemap index file URLs from your WordPress site to proxy to your
   * headless frontend.
   */
  sitemapIndexPaths: string[];
  /**
   * Next.js static pages you want included in you /sitemap.xml file.
   */
  pages?: NextJSPage[];
  /**
   * Replace the WordPress site URL for your headless frontend site url in the
   * sitemap url entries.
   */
  replaceWPUrls?: boolean;
  /**
   * Should the middleware generate the /sitemap.xml file for you?
   */
  proxySitemapXml?: boolean;
}

/**
 * Creates an XML sitemap index file from a list of sitemap URLs
 *
 * @param sitemaps A list of sitemap URL objects
 * @returns
 */
export function createSitemapIndex(sitemaps: SitemapSchemaSitemapElement[]) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps
      .map((sitemap) => {
        const lastmod = sitemap?.lastmod
          ? `<lastmod>${sitemap.lastmod}</lastmod>`
          : '';

        return `<sitemap>
          <loc>${sitemap.loc}</loc>
          ${lastmod}
        </sitemap>`;
      })
      .join('')}
    </sitemapindex>`;

  const response = new Response(xml);
  response.headers.set('Content-Type', 'application/xml');

  return response;
}

/**
 * Creates an XML Sitemap file from a list of URLs
 *
 * @param urls A list of URL objects
 * @returns
 */
export function createSitemap(urls: SitemapSchemaUrlElement[]) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((url) => {
        const lastmod = url?.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : '';
        const changefreq = url?.changefreq
          ? `<changefreq>${url.changefreq}</changefreq>`
          : '';
        const priority = url?.priority
          ? `<priority>${url.priority}</priority>`
          : '';
        return `<url>
            <loc>${url.loc}</loc>
            ${lastmod}
            ${changefreq}
            ${priority}
          </url>`;
      })
      .join('')}
  </urlset>`;

  const response = new Response(xml);
  response.headers.set('Content-Type', 'application/xml');

  return response;
}

/**
 * Creates the root XML sitemap (e.g. /sitemap.xml) that combines all the
 * specified sitemap index paths with the specified Next.js pages.
 *
 * @param req The Next.js middleware request object
 * @param config The proxySitemapRequests config object
 * @returns A response object
 */
export function createRootSitemap(
  req: NextRequest,
  config: ProxySitemapRequestsConfig,
): Response {
  const { pages, sitemapIndexPaths } = config;
  const { origin } = new URL(req.url);
  let sitemapIndices: SitemapSchemaSitemapElement[] = [];

  if (!isUndefined(pages) && isArray(pages) && pages.length) {
    sitemapIndices = [
      ...sitemapIndices,
      { loc: `${trimEnd(origin, '/')}/sitemap-pages.xml` },
    ];
  }

  if (
    !isUndefined(sitemapIndexPaths) &&
    isArray(sitemapIndexPaths) &&
    sitemapIndexPaths.length
  ) {
    sitemapIndexPaths.forEach((sitemapIndexPath) => {
      sitemapIndices = [
        ...sitemapIndices,
        { loc: `${trimEnd(origin, '/')}/${trim(sitemapIndexPath, '/')}` },
      ];
    });
  }

  return createSitemapIndex(sitemapIndices);
}

/**
 * Creates a sitemap for the specified Next.js pages. Visitable at
 * /sitemap-pages.xml
 *
 * @param req The Next.js middleware request object
 * @param config The proxySitemapRequests config object
 * @returns A response object
 */
export function createPagesSitemap(
  req: NextRequest,
  config: ProxySitemapRequestsConfig,
) {
  const { origin } = new URL(req.url);
  const { pages } = config;

  if (isUndefined(pages) || !isArray(pages) || !pages.length) {
    return createSitemap([]);
  }

  let urls: SitemapSchemaUrlElement[] = [];

  pages.forEach((page) => {
    urls = [
      ...urls,
      { loc: `${trimEnd(origin, '/')}/${trim(page.path, '/')}` },
    ];
  });

  return createSitemap(urls);
}

export async function resolveSitemapIndexPaths(
  req: NextRequest,
  config: ProxySitemapRequestsConfig,
) {
  const { wpUrl } = coreConfig();
  const { pathname, origin } = new URL(req.url);

  const res = await fetch(`${trimEnd(wpUrl, '/')}/${pathname}`);

  if (res.status === 404) {
    return undefined;
  }

  const xmlRes = await res.text();

  console.log('xmlRes', xmlRes);

  const parser = new XMLParser({
    ignoreAttributes: false,
    preserveOrder: false,
    unpairedTags: ['xml', 'xml-stylesheet'],
    processEntities: true,
    htmlEntities: true,
  });
  const xmlJson: {
    urlset: {
      url: SitemapSchemaUrlElement[];
    };
  } = parser.parse(xmlRes);

  let urls: SitemapSchemaUrlElement[] = [];

  xmlJson.urlset.url.forEach((url) => {
    const newUrl = url;
    newUrl.loc = url.loc.replace(trim(wpUrl, '/'), trim(origin, '/'));

    console.log('new url', newUrl);

    urls = [...urls, newUrl];
  });

  return createSitemap(urls);
}

export async function proxySitemapRequests(
  req: NextRequest,
  _config: ProxySitemapRequestsConfig,
): Promise<Response | undefined> {
  const config = defaults({}, _config, {
    replaceWPUrls: true,
    proxySitemapXml: true,
  });

  // TODO: validate config

  const headlessPathname = new URL(req?.url, 'http://non-existant-host')
    ?.pathname;

  const { proxySitemapXml, pages } = config;

  if (headlessPathname === '/sitemap.xml' && proxySitemapXml === true) {
    return createRootSitemap(req, config);
  }

  if (headlessPathname === '/sitemap-pages.xml' && pages && pages?.length > 0) {
    return createPagesSitemap(req, config);
  }

  if (config.sitemapIndexPaths.includes(headlessPathname)) {
    return resolveSitemapIndexPaths(req, config);
  }

  return undefined;
}
