import { ApiConfig } from './client';

export function isServerSide() {
  return typeof window === 'undefined';
}

export function isBase64(str: string) {
  if (!str) {
    return false;
  }

  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?\n?$/.test(
    str.replace(/\n/g, ''),
  );
}

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

export function getQueryParam(search: string, param: string) {
  if (search.length === 0) {
    return '';
  }

  let query = search;

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

export function normalizeConfig(config: ApiConfig) {
  let { baseUrl } = config;

  baseUrl = baseUrl.trim();

  if (/\/$/.test(baseUrl)) {
    baseUrl = baseUrl.slice(0, -1);
  }

  return { ...config, baseUrl };
}
