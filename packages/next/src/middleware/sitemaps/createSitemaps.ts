import { X2jOptions, XMLParser } from 'fast-xml-parser';
import { NextRequest } from 'next/server.js';
import {
  NormalizedConfig,
  FAUST_PAGES_PATHNAME,
} from './handleSitemapRequests.js';
import {
  createSitemap,
  createSitemapIndex,
  SitemapSchemaSitemapElement,
  SitemapSchemaUrlElement,
  isArray,
  trimSlashes,
  isUndefined,
} from './sitemapUtils.js';

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

const parserConfig: Partial<X2jOptions> = {
  ignoreAttributes: false,
  preserveOrder: false,
  unpairedTags: ['xml', 'xml-stylesheet'],
  processEntities: true,
  htmlEntities: true,
};

/**
 * Creates the root XML sitemap index (e.g. /sitemap.xml) that lists all the
 * sitemaps provided as the sitemapPaths property in the config, in addition to
 * a sitemap for the Next.js pages provided as the pages property in the config.
 *
 * @param {NextRequest} req The Next.js middleware request object
 * @param {NormalizedConfig} normalizedConfig A normalized config object
 * @returns {Response|undefined}
 */
export async function createRootSitemapIndex(
  req: NextRequest,
  normalizedConfig: NormalizedConfig,
): Promise<Response | undefined> {
  const { pages, sitemapPathsToIgnore, replaceUrls, wpUrl } = normalizedConfig;
  const { pathname, origin } = new URL(req.url);
  let sitemaps: SitemapSchemaSitemapElement[] = [];

  if (!isUndefined(pages) && isArray(pages) && pages.length) {
    sitemaps = [
      ...sitemaps,
      { loc: `${trimSlashes(origin)}/${trimSlashes(FAUST_PAGES_PATHNAME)}` },
    ];
  }

  const wpSitemapUrl = `${trimSlashes(wpUrl)}/${trimSlashes(pathname)}`;
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
    ...parserConfig,
    /**
     * FXP can not determine if a single tag should be parsed as an array or
     * an object, so we need to specify we always want "sitemap" tags to be an
     * array.
     *
     * @see https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#isarray
     */
    isArray: (tagName) => {
      return tagName === 'sitemap';
    },
  });

  // JS object representation of the XML sitemap index
  const parsedSitemapIndex: ParsedSitemapIndex = parser.parse(xmlRes);
  let wpSitemaps = parsedSitemapIndex?.sitemapindex?.sitemap;

  // The XML we parsed was not a proper sitemap
  if (isUndefined(wpSitemaps)) {
    return undefined;
  }

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
      const pathLessWildcard = path.slice(0, -1);
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
          loc: sitemap.loc.replace(trimSlashes(wpUrl), trimSlashes(origin)),
        },
      ];
    });
  } else {
    sitemaps = [...sitemaps, ...wpSitemaps];
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
  normalizedConfig: NormalizedConfig,
): Response | undefined {
  const { origin } = new URL(req.url);
  const { pages } = normalizedConfig;

  if (isUndefined(pages) || !isArray(pages) || !pages.length) {
    return undefined;
  }

  let urls: SitemapSchemaUrlElement[] = [];

  pages.forEach((page) => {
    urls = [
      ...urls,
      {
        loc: `${trimSlashes(origin)}/${trimSlashes(page.path)}`,
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
  normalizedConfig: NormalizedConfig,
): Promise<Response | undefined> {
  const { wpUrl, replaceUrls } = normalizedConfig;
  const { pathname, origin } = new URL(req.url);

  const wpSitemapUrl = `${trimSlashes(wpUrl)}/${trimSlashes(pathname)}`;
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
    ...parserConfig,
    /**
     * FXP can not determine if a single tag should be parsed as an array or
     * an object, so we need to specify we always want "url" tags to be an
     * array.
     *
     * @see https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md#isarray
     */
    isArray: (tagName) => {
      return tagName === 'url';
    },
  });

  // JS object representation of the XML sitemap
  const parsedSitemap: ParsedSitemap = parser.parse(xmlRes);
  const wpSitemapUrls = parsedSitemap?.urlset?.url;

  // The XML we parsed was not a proper sitemap
  if (isUndefined(wpSitemapUrls)) {
    return undefined;
  }

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
          loc: url.loc.replace(trimSlashes(wpUrl), trimSlashes(origin)),
        },
      ];
    });
  } else {
    urls = wpSitemapUrls;
  }

  return createSitemap(urls);
}
