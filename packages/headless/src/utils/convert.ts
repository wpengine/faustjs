import { print as gqlPrint, DocumentNode } from 'graphql';
import { HeadlessConfig, ParsedUrlInfo } from '../types';
import { isBase64, isServerSide } from './assert';

/**
 * Decodes a base64 string, compatible server-side and client-side
 *
 * @export
 * @param {string} str
 * @returns
 */
export function base64Decode(str: string): string {
  if (!isBase64(str)) {
    return str;
  }

  if (isServerSide()) {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  return atob(str);
}

/**
 * Encodes a string to base64, compatible server-side and client-side
 *
 * @export
 * @param {string} str
 * @returns
 */
export function base64Encode(str: string): string {
  if (isServerSide()) {
    return Buffer.from(str, 'utf8').toString('base64');
  }

  return btoa(str);
}

/**
 * Takes a HeadlessConfig and ensures the properties that need to be normalized
 * (e.g. URL slashes trimmed, etc) are handled.
 *
 * @export
 * @param {HeadlessConfig} config
 * @returns {HeadlessConfig}
 */
export function normalizeConfig(config: HeadlessConfig): HeadlessConfig {
  let { uriPrefix } = config;

  if (!uriPrefix) {
    uriPrefix = '';
  }

  uriPrefix = uriPrefix.trim();

  if (/\/$/.test(uriPrefix)) {
    uriPrefix = uriPrefix.slice(0, -1);
  }

  return { ...config, uriPrefix };
}

/**
 * Trims the last slash off of a string, if one exists
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function trimTrailingSlash(str: string | undefined): string | undefined {
  if (!str) {
    return str;
  }

  return str.replace(/\/$/, '');
}

const URL_REGEX = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

/* eslint-disable consistent-return */
/**
 * Parses a url into various parts
 *
 * @export
 * @param {(string | undefined)} url
 * @returns {ParsedUrlInfo}
 */
export function parseUrl(url: string | undefined): ParsedUrlInfo | undefined {
  if (!url) {
    return;
  }

  const parsed = URL_REGEX.exec(url);

  if (!parsed || parsed.length < 1) {
    return;
  }

  return {
    href: parsed[0],
    protocol: parsed[1],
    baseUrl: `${parsed[1]}${parsed[3]}`,
    host: parsed[4],
    pathname: parsed[5],
    search: parsed[6],
    hash: parsed[8],
  };
}
/* eslint-enable consistent-return */

/**
 * Gets query parameters from a url or search string
 *
 * @export
 * @param {string} url
 * @param {string} param
 * @returns {string}
 */
export function getQueryParam(url: string, param: string) {
  if (!url || url.length === 0) {
    return '';
  }

  const parsedUrl = parseUrl(url);

  if (!parsedUrl) {
    return '';
  }

  let query = parsedUrl.search;

  if (query[0] === '?') {
    query = query.substring(1);
  }

  const params = query.split('&');

  for (let i = 0; i < params.length; i += 1) {
    const pair = params[i].split('=');
    if (decodeURIComponent(pair[0]) === param) {
      return decodeURIComponent(pair[1]);
    }
  }

  return '';
}

/**
 * Gets the path without the protocol/host/port from a full URL string
 *
 * @export
 * @param {string} [url]
 * @returns
 */
export function getUrlPath(url?: string): string {
  const parsedUrl = parseUrl(url);

  if (!parsedUrl) {
    return '/';
  }

  return `${parsedUrl?.pathname || '/'}${parsedUrl?.search || ''}`;
}

/**
 * Ensures that a url does not have the specified prefix in it.
 *
 * @export
 * @param {string} url
 * @param {string} [prefix]
 * @returns
 */
export function resolvePrefixedUrlPath(url: string, prefix?: string): string {
  let resolvedUrl = url;

  if (prefix) {
    resolvedUrl = url.replace(prefix, '');
  }

  const splitUrl = resolvedUrl.split('/');

  /**
   * Remove preview and preview ID if provided as WPGraphQL will not be able to resolve queries such as nodeByUri
   * properly.
   */
  if (splitUrl?.[splitUrl.length - 2] === 'preview') {
    resolvedUrl = splitUrl.slice(0, splitUrl.length - 2).join('/');
  }

  /**
   * Paginated paths like /category/uncategorized/after/abc123 resolve to /category/uncategorized.
   *
   * WPGraphQL cannot natively parse the /after/abc123 portion, so we need to strip it from the query.
   * Templates can still read the /after/abc123 portion to build custom queries from the URL.
   */
  if ((splitUrl[3] === 'after' || splitUrl[3] === 'before') && splitUrl[3]) {
    resolvedUrl = splitUrl.slice(0, 3).join('/');
  }

  if (resolvedUrl === '') {
    resolvedUrl = '/';
  }

  return resolvedUrl;
}

/* eslint-disable consistent-return */
/**
 * Removes a leading slash from a string if they exist
 *
 * @export
 * @param {(string | undefined)} str
 * @returns
 */
export function trimLeadingSlash(str: string | undefined): string | undefined {
  if (!str) {
    return str;
  }

  if (str[0] === '/') {
    return str.slice(1);
  }
}
/* eslint-enable consistent-return */

/* eslint-disable consistent-return */
export function getCookiesFromContext(context?: any): string | undefined {
  if (!context) {
    return;
  }

  if (context.previewData?.serverInfo) {
    return context.previewData.serverInfo.cookie as string | undefined;
  }

  if (context.req?.headers?.cookie) {
    return context.req.headers.cookie as string | undefined;
  }

  if (context.headers?.cookie) {
    return context.headers.cookie as string | undefined;
  }

  if (context.cookie) {
    return context.cookie as string | undefined;
  }
}
/* eslint-enable consistent-return */

/**
 * Trims the origin (protocol, host, port) from URL so only the path and query params remain
 */
export function trimOriginFromUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);

    return url.replace(parsedUrl.origin, '');
  } catch (e) {
    return url;
  }
}

/* eslint-disable consistent-return */
export function stringifyGql(doc?: DocumentNode): string | undefined {
  if (!doc) {
    return;
  }

  return gqlPrint(doc);
}
/* eslint-enable consistent-return */
