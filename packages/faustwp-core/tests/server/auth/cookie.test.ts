import { mergeCookies } from '../../../src/server/auth/cookie';

describe('mergeCookies', () => {
  it('merges cookies from an existing setCookie header and a new cookie', () => {
    const existingSetCookieHeader = `http://headless.local-rt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`;
    const newCookie = `http://headless.local-has-rt=0; Max-Age=2592000; Path=/`;
    const result = mergeCookies(existingSetCookieHeader, newCookie);

    expect(result).toStrictEqual([existingSetCookieHeader, newCookie]);
  });

  it('returns the cookie if existing set cookie header does not exist', () => {
    const newCookie = `http://headless.local-has-rt=0; Max-Age=2592000; Path=/`;

    expect(mergeCookies(undefined, newCookie)).toStrictEqual(newCookie);
  });

  it('merges cookies from an existing array of setCookies', () => {
    const existingSetCookieHeader = [
      `http://headless.local-rt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
      `http://testing.local-rt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
    ];
    const newCookie = `http://headless.local-has-rt=0; Max-Age=2592000; Path=/`;
    const result = mergeCookies(existingSetCookieHeader, newCookie);

    expect(result).toStrictEqual([...existingSetCookieHeader, newCookie]);
  });
});
