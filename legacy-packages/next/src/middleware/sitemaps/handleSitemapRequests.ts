import { NextRequest } from 'next/server.js';
import {
  createPagesSitemap,
  createRootSitemapIndex,
  handleSitemapPath,
  handleRobotsTxt,
} from './createSitemaps.js';
import {
  SitemapSchemaUrlElement,
  isArray,
  isBoolean,
  isString,
  isUndefined,
  isObject,
  isFunction,
} from './sitemapUtils.js';

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

export interface GetSitemapPropsConfig extends HandleSitemapRequestsConfig {
  /**
   * The headless frontend URL
   */
  frontendUrl: string;
}

export interface HandleSitemapRequestsConfig {
  /**
   * The URL of your WordPress site.
   *
   * @example https://my-wp-site.com
   */
  wpUrl: string;

  /**
   * The sitemap path for server side
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
  replaceUrls?: boolean;
  /**
   * If defined, the text returned from this function will be used for the
   * `/robots.txt` route. The `/robots.txt` route will not be created if this
   * function is not defined.
   */
  robotsTxt?: (sitemapUrl: string) => Promise<string>;
}

export interface NormalizedMiddlewareConfig
  extends Omit<HandleSitemapRequestsConfig, 'replaceUrls'> {
  replaceUrls: boolean;
}

export interface NormalizedServerConfig
  extends Omit<GetSitemapPropsConfig, 'replaceUrls'> {
  replaceUrls: boolean;
}

/**
 * The pathname to the Next.js pages sitemap file. We may want to make this
 * configurable in the future.
 */
export const FAUST_PAGES_PATHNAME = '/sitemap-faust-pages.xml';

/**
 * The pathname to the robots.txt file.
 */
export const FAUST_ROBOTS_PATHNAME = '/robots.txt';

/**
 * Validates the structure of the user defined config.
 *
 * @param {Partial<HandleSitemapRequestsConfig>} config The user provided config
 */
export function validateConfig(
  config: Partial<HandleSitemapRequestsConfig & GetSitemapPropsConfig>,
  isMiddleware = true,
): void {
  if (isUndefined(config?.wpUrl)) {
    throw new Error('wpUrl is required.');
  }

  if (!isString(config?.wpUrl)) {
    throw new Error('wpUrl must be a string.');
  }

  try {
    // eslint-disable-next-line no-new
    new URL(config.wpUrl);
  } catch (e) {
    throw new Error('wpUrl must be a valid URL.');
  }

  if (!isMiddleware) {
    if (isUndefined(config?.frontendUrl)) {
      throw new Error('frontendUrl is required');
    }

    if (!isString(config?.frontendUrl)) {
      throw new Error('frontendUrl must be a string');
    }

    try {
      // eslint-disable-next-line no-new
      new URL(config.frontendUrl);
    } catch (e) {
      throw new Error('frontendUrl must be a valid URL.');
    }
  }

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

    config?.sitemapPathsToIgnore?.forEach((path) => {
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

    config?.pages?.forEach((page) => {
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

  // Validate robotsTxt is a function
  if (!isUndefined(config?.robotsTxt) && !isFunction(config?.robotsTxt)) {
    throw new Error('robotsTxt must be a function');
  }
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
  config: HandleSitemapRequestsConfig,
): Promise<Response | undefined> {
  // Validate config structure
  validateConfig(config);

  // Normalize config if some optional values are missing
  // eslint-disable-next-line prefer-object-spread
  const normalizedConfig: NormalizedMiddlewareConfig = Object.assign(
    {},
    { replaceUrls: true },
    config,
  ) as NormalizedMiddlewareConfig;

  const { pathname } = new URL(req.url);
  const { sitemapIndexPath, pages, robotsTxt } = normalizedConfig;

  // Handle the root XML sitemap if specified in the config
  if (pathname === sitemapIndexPath) {
    return createRootSitemapIndex(req, normalizedConfig);
  }

  // Handle the sitemap for the specified Next.js pages if specified in the config
  if (pathname === FAUST_PAGES_PATHNAME && pages?.length) {
    return createPagesSitemap(req, normalizedConfig);
  }

  // Handle the robots.txt file if specified in the config
  if (pathname === FAUST_ROBOTS_PATHNAME && robotsTxt) {
    return handleRobotsTxt(req, normalizedConfig);
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
