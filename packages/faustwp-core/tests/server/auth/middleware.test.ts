import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { IncomingMessage, ServerResponse } from 'http';
import { authorizeHandler } from '../../../src/server/auth/middleware';
import * as getWpUrl from '../../../src/lib/getWpUrl';
import * as getWpSecret from '../../../src/lib/getWpSecret';

describe('auth/middleware', () => {
  test('authorizeHandler will send a 401 when there is no code or refresh token', async () => {
    const req: IncomingMessage = {
      headers: {},
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');

    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(401);
    expect(endSpy).toBeCalledWith(JSON.stringify({ error: 'Unauthorized' }));

    endSpy.mockRestore();
  });

  test('authorizeHandler will throw an error if the client secret is not defined', async () => {
    const req: IncomingMessage = {
      headers: {},
    } as any;

    const res: ServerResponse = {
      setHeader() {},
      writeHead() {},
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
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');

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
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');
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

    endSpy.mockRestore();
    warningSpy.mockRestore();
    fetchMock.restore();
  });
});
