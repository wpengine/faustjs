import defaults from 'lodash/defaults.js';
import isUndefined from 'lodash/isUndefined.js';
import isArray from 'lodash/isArray.js';
import isObject from 'lodash/isObject.js';
import { config as coreConfig } from '@faustjs/core';
import { NextRequest } from 'next/server.js';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { trim, trimEnd } from 'lodash';

export interface NextPage {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
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
  pages?: NextPage[];
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

export interface Index {
  loc: string;
  lastmod?: string;
}
export function createSitemapIndex(indices: Index[]) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${indices
      .map((sitemapIndex) => {
        const lastmod = sitemapIndex?.lastmod
          ? `<lastmod>${sitemapIndex.lastmod}</lastmod>`
          : '';

        return `<sitemap>
          <loc>${sitemapIndex.loc}</loc>
          ${lastmod}
        </sitemap>`;
      })
      .join('')}
    </sitemapindex>`;

  const response = new Response(xml);
  response.headers.set('Content-Type', 'application/xml');

  return response;
}

export interface Url {
  loc: string;
  lastmod?: string;
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
}
export function createSitemap(urls: Url[]) {
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

export function createRootSitemap(
  req: NextRequest,
  config: ProxySitemapRequestsConfig,
) {
  const { pages, sitemapIndexPaths } = config;
  const { origin } = new URL(req.url);
  let sitemapIndices: Array<{ loc: string; lastmod?: string }> = [];

  if (!isUndefined(pages) && isArray(pages) && pages.length) {
    sitemapIndices = [
      ...sitemapIndices,
      { loc: `${origin}/sitemap-pages.xml` },
    ];
  }

  if (
    !isUndefined(sitemapIndexPaths) &&
    isArray(sitemapIndexPaths) &&
    sitemapIndexPaths.length
  ) {
    sitemapIndexPaths.forEach((index) => {
      sitemapIndices = [...sitemapIndices, { loc: `${origin}${index}` }];
    });
  }

  return createSitemapIndex(sitemapIndices);
}

export function createPagesSitemap(
  req: NextRequest,
  config: ProxySitemapRequestsConfig,
) {
  const { origin } = new URL(req.url);
  const { pages } = config;

  if (isUndefined(pages) || !isArray(pages) || !pages.length) {
    return createSitemap([]);
  }

  let urls: Url[] = [];

  pages.forEach((page) => {
    urls = [...urls, { loc: `${origin}${page.loc}` }];
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
      url: Url[];
    };
  } = parser.parse(xmlRes);

  let urls: Url[] = [];

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
  const { wpUrl } = coreConfig();

  const config = defaults({}, _config, {
    replaceWPUrls: true,
    proxySitemapXml: true,
  });

  // validate config

  const headlessPathname = new URL(req?.url, 'http://non-existant-host')
    ?.pathname;

  console.log('headlessPathname, ', headlessPathname);

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
