import isArrayLike from 'lodash/isArrayLike.js';
import isEmpty from 'lodash/isEmpty.js';
import isString from 'lodash/isString.js';
import isUndefined from 'lodash/isUndefined.js';
import { isBase64, isServerSide, previewRegex } from './assert.js';

/**
 * The result of parsing a URL into its parts
 *
 * @export
 * @interface ParsedUrlInfo
 */
export interface ParsedUrlInfo {
  href: string;
  protocol: string;
  baseUrl: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
}

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
  if (!isString(str)) {
    return '';
  }

  if (isServerSide()) {
    return Buffer.from(str, 'utf8').toString('base64');
  }

  return btoa(str);
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

  if (
    !isArrayLike(parsed) ||
    isEmpty(parsed) ||
    (isUndefined(parsed[4]) && url[0] !== '/')
  ) {
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
export function getQueryParam(url: string, param: string): string {
  if (!isString(url) || !isString(param) || isEmpty(url) || isEmpty(param)) {
    return '';
  }

  const parsedUrl = parseUrl(url);

  if (isUndefined(parsedUrl) || !isString(parsedUrl.search)) {
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

  if (isUndefined(parsedUrl)) {
    return '/';
  }

  return `${parsedUrl.pathname || '/'}${parsedUrl.search || ''}`;
}

export function stripPreviewFromUrlPath(urlPath: string): string {
  if (!urlPath) {
    return urlPath;
  }

  return urlPath.replace(previewRegex, '$1');
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

  if (resolvedUrl === '') {
    resolvedUrl = '/';
  }

  return resolvedUrl;
}

/* eslint-disable consistent-return, @typescript-eslint/explicit-module-boundary-types */
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
/* eslint-enable consistent-return, @typescript-eslint/explicit-module-boundary-types */

export function removeURLParam(url: string, parameter: string): string {
  const parts = url.split('?');
  if (parts.length >= 2) {
    const prefix = `${encodeURIComponent(parameter)}=`;
    const pars = parts[1].split(/[&;]/g);

    // eslint-disable-next-line no-plusplus
    for (let i = pars.length; i-- > 0; ) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return parts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '');
  }
  return url;
}
