import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { IncomingMessage, ServerResponse } from 'http';
import {
  authorizeHandler,
  logoutHandler,
} from '../../../src/server/auth/middleware';
import * as getWpUrl from '../../../src/lib/getWpUrl';
import * as getWpSecret from '../../../src/lib/getWpSecret';
import { base64Encode } from '../../../src/utils';

describe('auth/middleware', () => {
  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
  });

  afterAll(() => {
    process.env = envBackup;
  });

  test('authorizeHandler will send a 401 when there is no code or refresh token', async () => {
    const req: IncomingMessage = {
      headers: {},
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
      getHeader() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');
    const setHeaderSpy = jest.spyOn(res, 'setHeader');

    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(401);
    expect(endSpy).toBeCalledWith(JSON.stringify({ error: 'Unauthorized' }));

    // Expect the refresh token cookie to be set with an empty string past expiration
    expect(setHeaderSpy).toBeCalledWith(
      'Set-Cookie',
      'http://headless.local-rt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure',
    );

    // Expect the reference rt cookie to be set with 0 as there is no logged in user.
    expect(setHeaderSpy).toBeCalledWith(
      'Set-Cookie',
      'http://headless.local-has-rt=0; Max-Age=2592000; Path=/',
    );

    endSpy.mockRestore();
    setHeaderSpy.mockRestore();
  });

  test('authorizeHandler will throw an error if the client secret is not defined', async () => {
    const req: IncomingMessage = {
      headers: {},
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
      getHeader() {},
      end() {},
    } as any;

    try {
      await authorizeHandler(req, res);
    } catch (e) {
      expect((e as Error).message).toContain(
        'The apiClientSecret must be specified',
      );
      console.log(e);
    }
  });

  test('authorizeHandler will throw a 401 if the request to WordPress authorize endpoint is not ok', async () => {
    const req: IncomingMessage = {
      url: 'https://developers.wpengine.com/?code=code',
      headers: {},
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
      getHeader() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');
    const setHeaderSpy = jest.spyOn(res, 'setHeader');

    const wpUrl = 'http://my-wp-site.com';
    const getWpSecretSpy = jest
      .spyOn(getWpSecret, 'getWpSecret')
      .mockReturnValue('secret');
    const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

    fetchMock.post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
      status: 401,
      body: JSON.stringify({ error: 'some error' }),
    });

    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(401);
    expect(endSpy).toBeCalledWith(JSON.stringify({ error: 'some error' }));

    // Expect the refresh token cookie to be set with an empty string past expiration
    expect(setHeaderSpy).toBeCalledWith(
      'Set-Cookie',
      'http://my-wp-site.com-rt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure',
    );

    // Expect the reference rt cookie to be set with 0 as there is no logged in user.
    expect(setHeaderSpy).toBeCalledWith(
      'Set-Cookie',
      'http://my-wp-site.com-has-rt=0; Max-Age=2592000; Path=/',
    );

    setHeaderSpy.mockRestore();
    endSpy.mockRestore();
    fetchMock.restore();
  });

  test('authorizeHandler will fallback to deprecated authorize endpoint if first attempt is 404', async () => {
    const wpUrl = 'http://my-wp-site.com';
    const getWpSecretSpy = jest
      .spyOn(getWpSecret, 'getWpSecret')
      .mockReturnValue('secret');
    const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

    const req: IncomingMessage = {
      url: 'https://developers.wpengine.com/?code=code',
      headers: {},
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
      getHeader() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');
    const setHeaderSpy = jest.spyOn(res, 'setHeader');
    const warningSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
    const successResponse = {
      message: 'Successfully called deprecated endpoint.',
      accessToken: 'valid-at',
      refreshToken: 'valid-rt',
      accessTokenExpiration: 10000,
      refreshTokenExpiration: 10000,
    };

    fetchMock
      .post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
        status: 404,
        body: JSON.stringify({ error: 'Plugin out of date.' }),
      })
      .post(`${wpUrl}/?rest_route=/wpac/v1/authorize`, {
        status: 200,
        body: JSON.stringify(successResponse),
      });

    await authorizeHandler(req, res);

    expect(warningSpy).toBeCalled();
    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(endSpy).toBeCalledWith(JSON.stringify(successResponse));

    // Expect the reference rt cookie to be set with a 1 since there is a logged in user.
    expect(setHeaderSpy).toBeCalledWith(
      'Set-Cookie',
      'http://my-wp-site.com-has-rt=1; Max-Age=2592000; Path=/',
    );

    // Expect the refresh token cookie to be set with the refresh token.
    // Note: The refresh token is base64 encoded then uri encoded before its saved
    // as the cookie value.
    const rtCookie = `http://my-wp-site.com-rt=${encodeURIComponent(
      base64Encode('valid-rt'),
    )}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Strict`;

    expect(setHeaderSpy).toBeCalledWith('Set-Cookie', rtCookie);

    endSpy.mockRestore();
    setHeaderSpy.mockRestore();
    warningSpy.mockRestore();
    fetchMock.restore();
  });
});

describe('logout handler', () => {
  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('logs out the user be setting the rt cookie and reference cookies to empty', async () => {
    const wpUrl = 'http://my-wp-site.com';
    const getWpSecretSpy = jest
      .spyOn(getWpSecret, 'getWpSecret')
      .mockReturnValue('secret');
    const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

    const req: IncomingMessage = {
      url: 'https://my-headless-site.com/api/faust/auth/logout',
      headers: {},
      method: 'POST',
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
      getHeader() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');
    const setHeaderSpy = jest.spyOn(res, 'setHeader');

    await logoutHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(205);

    expect(setHeaderSpy).toBeCalledWith(
      'Set-Cookie',
      'http://my-wp-site.com-rt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure',
    );

    expect(setHeaderSpy).toBeCalledWith(
      'Set-Cookie',
      'http://my-wp-site.com-has-rt=0; Max-Age=2592000; Path=/',
    );
  });

  it('only allows post requests', async () => {
    const wpUrl = 'http://my-wp-site.com';
    const getWpSecretSpy = jest
      .spyOn(getWpSecret, 'getWpSecret')
      .mockReturnValue('secret');
    const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

    const req: IncomingMessage = {
      url: 'https://my-headless-site.com/api/faust/auth/logout',
      headers: {},
      method: 'GET',
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
      getHeader() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');

    await logoutHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(405);
  });
});
