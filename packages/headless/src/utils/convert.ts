import { HeadlessConfig } from '../types';
import { isBase64, isServerSide } from './assert';

export function base64Decode(str: string) {
  if (!isBase64(str)) {
    return str;
  }

  if (isServerSide()) {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  return atob(str);
}

export function base64Encode(str: string) {
  if (isServerSide()) {
    return Buffer.from(str, 'utf8').toString('base64');
  }

  return btoa(str);
}

export function normalizeConfig(config: HeadlessConfig) {
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
export function parseUrl(url: string | undefined) {
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

export function getUrlPath(url?: string) {
  const parsedUrl = parseUrl(url);

  if (!parsedUrl) {
    return '/';
  }

  return parsedUrl?.pathname;
}

export function resolvePrefixedUrlPath(url: string, prefix?: string) {
  let resolvedUrl = url;

  if (prefix) {
    resolvedUrl = url.replace(prefix, '');
  }

  if (resolvedUrl === '') {
    resolvedUrl = '/';
  }

  return resolvedUrl;
}

/* eslint-disable consistent-return */
export function trimLeadingSlashes(str: string | undefined) {
  if (!str) {
    return str;
  }

  if (str[0] === '/') {
    return str.slice(1);
  }
}
/* eslint-enable consistent-return */
