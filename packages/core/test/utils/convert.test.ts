import {
  base64Decode,
  base64Encode,
  parseUrl,
  getQueryParam,
  getUrlPath,
  resolvePrefixedUrlPath,
  getCookiesFromContext,
} from '../../src/utils/convert';

describe('utils/convert', () => {
  test('base64Decode() returns the argument for a non-base64 string', () => {
    //@ts-ignore
    expect(base64Decode()).toBeUndefined();
    expect(base64Decode('test123')).toBe('test123');
  });

  test('base64Decode() returns a decoded base64 string', () => {
    expect(base64Decode('aGVsbG8td29ybGQ=')).toBe('hello-world');
  });

  test('base64Encode() returns an empty string for non-strings', () => {
    //@ts-ignore
    expect(base64Encode()).toBe('');
    //@ts-ignore
    expect(base64Encode(2)).toBe('');
    //@ts-ignore
    expect(base64Encode({})).toBe('');
  });

  test('base64Encode() returns an encoded base64 string', () => {
    expect(base64Encode('hello-world')).toBe('aGVsbG8td29ybGQ=');
  });

  test('parseUrl() returns undefined with no url', () => {
    expect(parseUrl(undefined)).toBeUndefined();
  });

  test('parseUrl() returns undefined for an invalid url', () => {
    expect(parseUrl('invalid_url')).toBeUndefined();
  });

  test('parseUrl() returns ParsedUrlInfo for a valid URL', () => {
    const expected = {
      href: 'https://developers.wpengine.com/posts?count=2#header',
      protocol: 'https:',
      baseUrl: 'https://developers.wpengine.com',
      host: 'developers.wpengine.com',
      pathname: '/posts',
      search: '?count=2',
      hash: '#header',
    };

    const parsed = parseUrl(expected.href);
    expect(parsed).toEqual(expected);
  });

  test('getQueryParam() returns empty strings for missing query params', () => {
    const url = 'https://developers.wpengine.com';
    expect(getQueryParam('', '')).toBe('');
    expect(getQueryParam(url, 'test')).toBe('');
    expect(getQueryParam(`${url}?foo=bar`, 'test')).toBe('');
  });

  test('getQueryParam() returns a query param when it exists', () => {
    const url = 'https://developers.wpengine.com?test=foo&test2=bar';
    expect(getQueryParam(url, 'test')).toBe('foo');
    expect(getQueryParam(url, 'test2')).toBe('bar');
  });

  test('getUrlPath() returns "/" for empty urls', () => {
    expect(getUrlPath()).toBe('/');
    expect(getUrlPath('https://developers.wpengine.com')).toBe('/');
  });

  test('getUrlPath() returns the path for urls with paths', () => {
    expect(getUrlPath('https://developers.wpengine.com/posts')).toBe('/posts');
  });

  test('getUrlPath() returns the path with search for urls with paths and search', () => {
    expect(
      getUrlPath('https://developers.wpengine.com/posts?search=true'),
    ).toBe('/posts?search=true');
  });

  test('resolvePrefixedUrlPath() replaces a url path in a url', () => {
    expect(resolvePrefixedUrlPath('/posts', '/posts')).toBe('/');
    expect(resolvePrefixedUrlPath('/posts', 'posts')).toBe('/');
    expect(
      resolvePrefixedUrlPath(
        'https://developers.wpengine.com/posts?search=true',
        '/posts',
      ),
    ).toBe('https://developers.wpengine.com?search=true');
  });

  test('getCookiesFromContext returns undefined for no cookie', () => {
    expect(getCookiesFromContext()).toBeUndefined();
  });

  test('getCookiesFromContext() finds cookies on previewData (next)', () => {
    expect(
      getCookiesFromContext({
        previewData: {
          serverInfo: {
            cookie: 'test=true',
          },
        },
      }),
    ).toBe('test=true');
  });

  test('getCookiesFromContext() finds cookies on request headers', () => {
    expect(
      getCookiesFromContext({
        req: {
          headers: {
            cookie: 'test=true',
          },
        },
      }),
    ).toBe('test=true');
  });

  test('getCookiesFromContext() finds cookies on headers', () => {
    expect(
      getCookiesFromContext({
        headers: {
          cookie: 'test=true',
        },
      }),
    ).toBe('test=true');
  });

  test('getCookiesFromContext() finds cookies on cookie', () => {
    expect(
      getCookiesFromContext({
        cookie: 'test=true',
      }),
    ).toBe('test=true');
  });
});
