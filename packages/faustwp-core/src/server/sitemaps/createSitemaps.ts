import type { IncomingMessage } from 'http';
import { X2jOptions, XMLParser } from 'fast-xml-parser';
import isArray from 'lodash/isArray.js';
import isUndefined from 'lodash/isUndefined.js';
import trim from 'lodash/trim.js';
import type { NextRequest } from 'next/server.js';
import { getWpUrl } from '../../lib/getWpUrl.js';
import {
  FAUST_PAGES_PATHNAME,
  GetSitemapPropsConfig,
  SITEMAP_INDEX_PATH,
} from './getSitemapProps.js';
import {
  createSitemap,
  createSitemapIndex,
  SitemapSchemaSitemapElement,
  SitemapSchemaUrlElement,
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
 * @param {NextRequest} req The Next.js request object
 * @param {NormalizedConfig} normalizedConfig A normalized config object
 * @returns {Response|undefined}
 */
export async function createRootSitemapIndex(
  req: NextRequest | IncomingMessage,
  config: GetSitemapPropsConfig,
): Promise<Response | undefined> {
  const { pages, sitemapPathsToIgnore, frontendUrl } = config;

  if (!req.url) {
    throw new Error('Request object must have URL');
  }

  // get sitemapIndexPath config param
  // fetch sitemap from WP
  const trimmedWpUrl = trim(getWpUrl(), '/');
  const trimmedFrontendUrl = trim(frontendUrl, '/');
  const trimmedSitemapIndexPath = trim(SITEMAP_INDEX_PATH, '/');
  const wpSitemapUrl = `${trimmedWpUrl}/${trimmedSitemapIndexPath}`;

  let sitemaps: SitemapSchemaSitemapElement[] = [];

  if (!isUndefined(pages) && isArray(pages) && pages.length) {
    const trimmedFaustPagesPart = `${trim(
      SITEMAP_INDEX_PATH,
      '/',
    )}?sitemap=${trim(FAUST_PAGES_PATHNAME, '/')}`;
    const sitemapFaustPagesUrl = `${trimmedFrontendUrl}/${trimmedFaustPagesPart}`;

    sitemaps = [
      ...sitemaps,
      {
        loc: encodeURI(sitemapFaustPagesUrl),
      },
    ];
  }

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
   * Replace the existing WordPress URL in each "loc" with the frontend URL
   *
   * @example
   * Replaces http://headless.local/wp-sitemap-posts-page-1.xml with
   * http://localhost:3000/wp-sitemap-posts-page-1.xml
   */
  wpSitemaps.forEach((sitemap) => {
    const url = new URL(sitemap.loc);
    const sitemapUrl = `${trim(frontendUrl, '/')}/sitemap.xml?sitemap=${trim(
      url.pathname,
      '/',
    )}`;

    sitemaps = [
      ...sitemaps,
      {
        ...sitemap,
        loc: sitemapUrl,
      },
    ];
  });

  return createSitemapIndex(sitemaps);
}

/**
 * Creates a sitemap for the Next.js pages specified in the "pages" config option
 *
 * @param req The Next.js middleware request object
 * @param config The config object
 * @returns {Response|undefined}
 */
export function createPagesSitemap(
  req: NextRequest | IncomingMessage,
  config: GetSitemapPropsConfig,
): Response | undefined {
  if (!req.url) {
    throw new Error('Request object must have URL');
  }

  const { frontendUrl, pages } = config;

  if (isUndefined(pages) || !isArray(pages) || !pages.length) {
    return undefined;
  }

  let urls: SitemapSchemaUrlElement[] = [];

  pages.forEach((page) => {
    urls = [
      ...urls,
      {
        loc: `${trim(frontendUrl, '/')}/${trim(page.path, '/')}`,
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
 * @param config The config object
 * @returns {Promise<Response|Undefined>}
 */
export async function handleSitemapPath(
  req: NextRequest | IncomingMessage,
  config: GetSitemapPropsConfig,
): Promise<Response | undefined> {
  if (!req.url) {
    throw new Error('Request object must have URL');
  }

  const { frontendUrl } = config;
  const paramsIndex = req.url.indexOf('?');
  const searchParamString = req.url.substr(paramsIndex);
  const urlParams = new URLSearchParams(searchParamString);

  const sitemapPath = urlParams.get('sitemap') as string;

  const wpSitemapUrl = `${trim(getWpUrl(), '/')}/${trim(sitemapPath, '/')}`;

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
        loc: url.loc.replace(trim(getWpUrl(), '/'), trim(frontendUrl, '/')),
      },
    ];
  });

  return createSitemap(urls);
}
