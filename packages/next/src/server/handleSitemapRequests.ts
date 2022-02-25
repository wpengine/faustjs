import { config as coreConfig } from '@faustjs/core';
import { XMLParser } from 'fast-xml-parser';
import isBoolean from 'lodash/isBoolean.js';
import isObject from 'lodash/isObject.js';
import isString from 'lodash/isString.js';
import defaults from 'lodash/defaults.js';
import isArray from 'lodash/isArray.js';
import isUndefined from 'lodash/isUndefined.js';
import trim from 'lodash/trim.js';
import trimEnd from 'lodash/trimEnd.js';
import { NextRequest } from 'next/server.js';

/**
 * This middleware may be used on the Vercel Edge Runtime for middleware.
 * This runtime is strict, and has a very limited amount of Node.js apis.
 * Please ensure that any logic here works with the Vercel Edge Runtime.
 *
 * @link https://nextjs.org/docs/api-reference/edge-runtime
 */

const FAUST_SITEMAP_PATHNAME = '/sitemap.xml';
const FAUST_PAGES_PATHNAME = '/sitemap-faust-pages.xml';

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

/**
 * the "pages" config type
 */
export interface NextJSPage extends Omit<SitemapSchemaUrlElement, 'loc'> {
  /**
   * The relative URL of the Next.js page.
   */
  path: string;
}

export interface HandleSitemapRequestsConfig {
  /**
   * A list of pathnames to proxy to the headless frontend from your
   * WordPress site. These must be XML sitemaps.
   *
   * For example, if you have a pathname of `/wp-sitemap-posts-post-1.xml`,
   * and a WordPress site at `https://my-wp-site.com`, your sitemap will be
   * proxied from `https://my-wp-site.com/wp-sitemap-posts-post-1.xml`
   */
  sitemapPathsToProxy?: string[];
  /**
   * Next.js pages you want included in you sitemap. When provided, an index
   * will be created specifically for these pages.
   */
  pages?: NextJSPage[];
  /**
   * Replace the WordPress site URL for your headless frontend site url in the
   * sitemap url entries.
   */
  replaceUrls: boolean;
}

/**
 * TypeScript representation of a parsed XML sitemap
 */
export interface ParsedSitemap {
  urlset: {
    url: SitemapSchemaUrlElement[];
  };
}

/**
 * Validates the structure of the user defined config.
 *
 * @param config The user provided config
 */

export function validateConfig(config: Partial<HandleSitemapRequestsConfig>) {
  // Validate sitemapIndexPaths structure and required values
  if (!isUndefined(config?.sitemapPathsToProxy)) {
    if (!isArray(config.sitemapPathsToProxy)) {
      throw new Error('sitemapIndexPaths must be an array');
    }

    (config?.sitemapPathsToProxy).forEach((sitemapIndexPath) => {
      if (!isString(sitemapIndexPath)) {
        throw new Error('sitemapIndexPaths must be an array of strings');
      }

      if (!sitemapIndexPath.startsWith('/')) {
        throw new Error(
          'Each sitemapIndexPath must start with a forward slash',
        );
      }
    });
  }

  // Validate pages structure and required values
  if (!isUndefined(config?.pages)) {
    if (!isArray(config.pages)) {
      throw new Error('pages must be an array');
    }

    (config?.pages).forEach((page) => {
      if (!isObject(page)) {
        throw new Error('pages must be an array of objects');
      }

      if (isUndefined(page.path)) {
        throw new Error('pages must have a path property');
      }
    });
  }

  // Validate replaceUrls is a boolean
  if (!isUndefined(config?.replaceUrls) && !isBoolean(config?.replaceUrls)) {
    throw new Error('replaceUrls must be a boolean');
  }
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
        const loc = `<loc>${sitemap.loc}</loc>`;
        let lastmod = '';

        if (sitemap?.lastmod) {
          lastmod = `<lastmod>${sitemap.lastmod}</lastmod>`;
        }

        return `<sitemap>
          ${loc}
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
 * Creates an XML Sitemap from a list of URLs
 *
 * @param {SitemapSchemaUrlElement[]} urls A list of URL objects
 * @returns {Response}
 */
export function createSitemap(urls: SitemapSchemaUrlElement[]) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((url) => {
        const loc = `<loc>${url.loc}</loc>`;
        let lastmod = '';
        let changefreq = '';
        let priority = '';

        if (url?.lastmod) {
          lastmod = `<lastmod>${url.lastmod}</lastmod>`;
        }

        if (url?.changefreq) {
          changefreq = `<changefreq>${url.changefreq}</changefreq>`;
        }

        if (url?.priority) {
          priority = `<priority>${url.priority}</priority>`;
        }

        return `<url>
            ${loc}
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
 * Creates the root XML sitemap index (e.g. /sitemap.xml) that lists all the
 * sitemaps provided as the sitemapPaths property in the config, in addition to
 * a sitemap for the Next.js pages provided as the pages property in the config.
 *
 * @param req The Next.js middleware request object
 * @param normalizedConfig A normalized config object
 * @returns {Response|undefined}
 */
export function createRootSitemapIndex(
  req: NextRequest,
  normalizedConfig: HandleSitemapRequestsConfig,
): Response {
  const { pages, sitemapPathsToProxy } = normalizedConfig;
  const { origin } = new URL(req.url);
  let sitemapIndices: SitemapSchemaSitemapElement[] = [];

  if (!isUndefined(pages) && isArray(pages) && pages.length) {
    sitemapIndices = [
      ...sitemapIndices,
      { loc: `${trimEnd(origin, '/')}/${trim(FAUST_PAGES_PATHNAME, '/')}` },
    ];
  }

  if (
    !isUndefined(sitemapPathsToProxy) &&
    isArray(sitemapPathsToProxy) &&
    sitemapPathsToProxy.length
  ) {
    sitemapPathsToProxy.forEach((sitemapPath) => {
      sitemapIndices = [
        ...sitemapIndices,
        { loc: `${trimEnd(origin, '/')}/${trim(sitemapPath, '/')}` },
      ];
    });
  }

  return createSitemapIndex(sitemapIndices);
}

/**
 * Creates a sitemap for the Next.js pages specified in the "pages" config option
 *
 * @param req The Next.js middleware request object
 * @param normalizedConfig A normalized config object
 * @returns {Response|undefined}
 */
export function createPagesSitemap(
  req: NextRequest,
  normalizedConfig: HandleSitemapRequestsConfig,
) {
  const { origin } = new URL(req.url);
  const { pages } = normalizedConfig;

  if (isUndefined(pages) || !isArray(pages) || !pages.length) {
    return createSitemap([]);
  }

  let urls: SitemapSchemaUrlElement[] = [];

  pages.forEach((page) => {
    urls = [
      ...urls,
      {
        loc: `${trimEnd(origin, '/')}/${trim(page.path, '/')}`,
        lastmod: page?.lastmod,
        changefreq: page?.changefreq,
        priority: page?.priority,
      },
    ];
  });

  return createSitemap(urls);
}

/**
 * Handles a request to a sitemap path listed in the sitemapPaths config option
 *
 * @param req The Next.js middleware request object
 * @param normalizedConfig A normalized config object
 * @returns {Promise<Response|Undefined>}
 */
export async function handleSitemapPath(
  req: NextRequest,
  normalizedConfig: HandleSitemapRequestsConfig,
): Promise<Response | undefined> {
  const { wpUrl } = coreConfig();
  const { replaceUrls } = normalizedConfig;
  const { pathname, origin } = new URL(req.url);

  const wpSitemapIndexUrl = `${trimEnd(wpUrl, '/')}/${trim(pathname, '/')}`;
  const res = await fetch(wpSitemapIndexUrl);

  // Don't proxy the sitemap if the response was not ok.
  if (!res.ok) {
    return undefined;
  }

  const xmlRes = await res.text();

  /**
   * Create a parser to convert our XML data into a JS object
   *
   * @link https://github.com/NaturalIntelligence/fast-xml-parser/blob/HEAD/docs/v4/6.HTMLParsing.md
   */
  const parser = new XMLParser({
    ignoreAttributes: false,
    preserveOrder: false,
    unpairedTags: ['xml', 'xml-stylesheet'],
    processEntities: true,
    htmlEntities: true,
  });

  // JS object representation of the XML sitemap
  const parsedSitemap: ParsedSitemap = parser.parse(xmlRes);
  const wpSitemapUrls = parsedSitemap.urlset.url;

  let urls: SitemapSchemaUrlElement[] = [];

  if (replaceUrls) {
    /**
     * Replace the existing WordPress URL in each "loc" with the headless URL
     *
     * @example
     * Replaces http://headless.local/wp-sitemap-posts-page-1.xml with
     * http://localhost:3000/wp-sitemap-posts-page-1.xml
     */
    wpSitemapUrls.forEach((url) => {
      urls = [
        ...urls,
        {
          ...url,
          loc: url.loc.replace(trim(wpUrl, '/'), trim(origin, '/')),
        },
      ];
    });
  } else {
    urls = wpSitemapUrls;
  }

  return createSitemap(urls);
}

/**
 * Next.js middleware to proxy sitemap requests from the WordPress site.
 *
 * @param req The Next.js middleware request object
 * @param config The user specified config object
 * @returns {Response|undefined} A response object if the current request
 * is for a sitemap that needs to be handled, undefined otherwise
 */
export async function handleSitemapRequests(
  req: NextRequest,
  config: Partial<HandleSitemapRequestsConfig>,
): Promise<Response | undefined> {
  // Validate config structure
  validateConfig(config);

  // Normalize config if some optional values are missing
  const normalizedConfig: HandleSitemapRequestsConfig = defaults({}, config, {
    replaceUrls: true,
    proxySitemapXml: true,
  });

  const { pathname } = new URL(req.url);
  const { pages } = normalizedConfig;

  // Handle the root XML sitemap if specified in the config
  if (pathname === FAUST_SITEMAP_PATHNAME) {
    return createRootSitemapIndex(req, normalizedConfig);
  }

  // Handle the sitemap for the specified Next.js pages if specified in the config
  if (pathname === FAUST_PAGES_PATHNAME && pages?.length) {
    return createPagesSitemap(req, normalizedConfig);
  }

  // Handle the sitemap index paths specified in the config
  if (normalizedConfig?.sitemapPathsToProxy?.includes(pathname)) {
    return handleSitemapPath(req, normalizedConfig);
  }

  /**
   * If the above conditions are not met, return undefined and go on to the
   * next middleware
   */
  return undefined;
}
