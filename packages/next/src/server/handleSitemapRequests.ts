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

/**
 * The pathname to the Next.js pages sitemap file. We may want to make this
 * configurable in the future.
 */
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
   *
   * @example /about
   */
  path: string;
}

export interface HandleSitemapRequestsConfig {
  /**
   * The pathname to the sitemap index file.
   *
   * @example /sitemap.xml, /wp-sitemap.xml, /sitemap_index.xml
   */
  sitemapIndexPath: string;
  /**
   * A list of pathnames to ignore when proxying sitemaps.
   */
  sitemapPathsToIgnore?: string[];
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
 * TypeScript representation of a parsed XML sitemap index
 */
export interface ParsedSitemapIndex {
  sitemapindex: {
    sitemap: SitemapSchemaSitemapElement[];
  };
}

/**
 * Validates the structure of the user defined config.
 *
 * @param {Partial<HandleSitemapRequestsConfig>} config The user provided config
 */
export function validateConfig(
  config: Partial<HandleSitemapRequestsConfig>,
): void {
  if (isUndefined(config?.sitemapIndexPath)) {
    throw new Error('sitemapIndexPath is required');
  }

  if (!isString(config?.sitemapIndexPath)) {
    throw new Error('sitemapIndexPath must be a string');
  }

  if (!config?.sitemapIndexPath.startsWith('/')) {
    throw new Error('sitemapIndexPath must start with a forward slash');
  }

  if (!isUndefined(config?.sitemapPathsToIgnore)) {
    if (!isArray(config.sitemapPathsToIgnore)) {
      throw new Error('sitemapPathsToIgnore must be an array');
    }

    (config?.sitemapPathsToIgnore).forEach((path) => {
      if (!isString(path)) {
        throw new Error('sitemapPathsToIgnore must be an array of strings');
      }

      if (!path.startsWith('/')) {
        throw new Error(
          'Each sitemapPathsToIgnore must start with a forward slash',
        );
      }

      if (path.includes('*') && !path.endsWith('*')) {
        throw new Error(
          'sitemapPathsToIgnore with a wildcard must end with a wildcard',
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

      if (!isString(page.path)) {
        throw new Error('The pages path property must be a string');
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
 * @param {SitemapSchemaSitemapElement[]} sitemaps A list of sitemap URL objects
 * @returns
 */
export function createSitemapIndex(
  sitemaps: SitemapSchemaSitemapElement[],
): Response {
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
export function createSitemap(urls: SitemapSchemaUrlElement[]): Response {
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
 * @param {NextRequest} req The Next.js middleware request object
 * @param {HandleSitemapRequestsConfig} normalizedConfig A normalized config object
 * @returns {Response|undefined}
 */
export async function createRootSitemapIndex(
  req: NextRequest,
  normalizedConfig: HandleSitemapRequestsConfig,
): Promise<Response | undefined> {
  const { wpUrl } = coreConfig();
  const { pages, sitemapPathsToIgnore, replaceUrls } = normalizedConfig;
  const { pathname, origin } = new URL(req.url);
  let sitemaps: SitemapSchemaSitemapElement[] = [];

  if (!isUndefined(pages) && isArray(pages) && pages.length) {
    sitemaps = [
      ...sitemaps,
      { loc: `${trimEnd(origin, '/')}/${trim(FAUST_PAGES_PATHNAME, '/')}` },
    ];
  }

  const wpSitemapUrl = `${trimEnd(wpUrl, '/')}/${trim(pathname, '/')}`;
  const res = await fetch(wpSitemapUrl);

  // Don't proxy the sitemap index if the response was not ok.
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

  // JS object representation of the XML sitemap index
  const parsedSitemapIndex: ParsedSitemapIndex = parser.parse(xmlRes);
  let wpSitemaps = parsedSitemapIndex.sitemapindex.sitemap;

  /**
   * Ignore paths with exact matches to the sitemapPathsToIgnore property
   */
  wpSitemaps = wpSitemaps.filter((sitemap) => {
    const { pathname: sitemapPathname } = new URL(sitemap.loc);

    return !sitemapPathsToIgnore?.includes(sitemapPathname);
  });

  /**
   * Ignore paths from sitemapPathsToIgnore property that end in a wildcard
   */
  const wildcardPathsToIgnore = sitemapPathsToIgnore?.filter((path) =>
    path.endsWith('*'),
  );
  wpSitemaps = wpSitemaps.filter((sitemap) => {
    const { pathname: sitemapPathname } = new URL(sitemap.loc);

    let hasWildcard = false;

    wildcardPathsToIgnore?.forEach((path) => {
      const pathLessWildcard = trimEnd(path, '*');
      if (sitemapPathname.startsWith(pathLessWildcard)) {
        hasWildcard = true;
      }
    });

    return !hasWildcard;
  });

  /**
   * Replace the existing WordPress URL in each "loc" with the headless URL
   * if necessary
   *
   * @example
   * Replaces http://headless.local/wp-sitemap-posts-page-1.xml with
   * http://localhost:3000/wp-sitemap-posts-page-1.xml
   */
  if (replaceUrls) {
    wpSitemaps.forEach((sitemap) => {
      sitemaps = [
        ...sitemaps,
        {
          ...sitemap,
          loc: sitemap.loc.replace(trim(wpUrl, '/'), trim(origin, '/')),
        },
      ];
    });
  } else {
    sitemaps = wpSitemaps;
  }

  return createSitemapIndex(sitemaps);
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
): Response | undefined {
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

  const wpSitemapUrl = `${trimEnd(wpUrl, '/')}/${trim(pathname, '/')}`;
  const res = await fetch(wpSitemapUrl);

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
  const normalizedConfig: HandleSitemapRequestsConfig = defaults(
    {},
    config as HandleSitemapRequestsConfig,
    {
      replaceUrls: true,
    },
  );

  const { pathname } = new URL(req.url);
  const { sitemapIndexPath, pages } = normalizedConfig;

  // Handle the root XML sitemap if specified in the config
  if (pathname === sitemapIndexPath) {
    return createRootSitemapIndex(req, normalizedConfig);
  }

  // Handle the sitemap for the specified Next.js pages if specified in the config
  if (pathname === FAUST_PAGES_PATHNAME && pages?.length) {
    return createPagesSitemap(req, normalizedConfig);
  }

  // Handle the sitemap index paths specified in the config
  if (
    pathname.includes('sitemap') &&
    pathname.endsWith('.xml') &&
    !normalizedConfig?.sitemapPathsToIgnore?.includes(pathname)
  ) {
    return handleSitemapPath(req, normalizedConfig);
  }

  /**
   * If the above conditions are not met, return undefined and go on to the
   * next middleware
   */
  return undefined;
}
