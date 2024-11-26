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
 * The below helper functions are pretty close to exactly what Lodash exports.
 * We are not including lodash because Next.js middleware is very sensitive to
 * imports. Lodash uses eval, and new Function(evalString), which is not supported
 * by Next.js middleware.
 *
 * @link https://nextjs.org/docs/api-reference/edge-runtime#unsupported-apis
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(str: any): str is string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (str != null && typeof str.valueOf() === 'string') {
    return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray(arr: any): arr is any[] {
  return Array.isArray(arr);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUndefined(val: any): val is undefined {
  return val === undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(val: any): val is object {
  const type = typeof val;
  return val != null && (type === 'object' || type === 'function');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(val: any) {
  return typeof val === 'function';
}

export function trimSlashes(str: string) {
  return str.replace(/^\/+|\/+$/g, '');
}
