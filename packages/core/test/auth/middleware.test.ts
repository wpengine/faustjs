import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { IncomingMessage, ServerResponse } from 'http';
import { headlessConfig } from '../../src';
import { authorizeHandler, redirect } from '../../src/auth/middleware';
import * as cookie from '../../src/auth/cookie';

describe('auth/middleware', () => {
  test('redirect will write a 302', () => {
    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const writeHeadSpy = jest.spyOn(res, 'writeHead');
    const endSpy = jest.spyOn(res, 'end');

    redirect(res, '/foo');
    expect(endSpy).toBeCalled();
    expect(writeHeadSpy).toBeCalledWith(302, {
      Location: '/foo',
    });
  });

  test('authorizeHandler will send a 401 when there is no code or refresh token', async () => {
    headlessConfig({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const req: IncomingMessage = {
      headers: {},
    } as any;

    const res: ServerResponse = {
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
    headlessConfig({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
    });

    const req: IncomingMessage = {
      headers: {},
    } as any;

    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    try {
      await authorizeHandler(req, res);
    } catch (e) {
      expect(e.message).toContain('The apiClientSecret must be specified');
      console.log(e);
    }
  });

  test('authorizeHandler will throw a 401 if the request to WordPress authorize endpoint is not ok', async () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const req: IncomingMessage = {
      url: 'https://developers.wpengine.com/?code=code',
      headers: {},
    } as any;

    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');

    const { wpUrl } = headlessConfig();

    fetchMock.post(`${wpUrl}/wp-json/wpac/v1/authorize`, {
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

  test('authorizeHandler will store a new refresh token upon a successful request', async () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const req: IncomingMessage = {
      url: 'https://developers.wpengine.com/?code=code',
      headers: {},
    } as any;

    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');

    const authorizeResponse = {
      accessToken: 'at',
      accessTokenExpiration: new Date().getTime() + 300,
      refreshToken: 'rt',
      refreshTokenExpiration: new Date().getTime() + 10000,
    };

    const { wpUrl } = headlessConfig();

    fetchMock.post(`${wpUrl}/wp-json/wpac/v1/authorize`, {
      status: 200,
      body: JSON.stringify(authorizeResponse),
    });

    const cookieSpy = jest
      .spyOn(cookie, 'storeRefreshToken')
      .mockImplementation(() => {});

    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(endSpy).toBeCalledWith(JSON.stringify(authorizeResponse));

    expect(cookieSpy).toBeCalledWith(authorizeResponse.refreshToken, res, {
      request: req,
    });

    endSpy.mockRestore();
    fetchMock.restore();
    cookieSpy.mockRestore();
  });

  test('authorizeHandler will succeed when no code is provided if there is a refresh token', async () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const req: IncomingMessage = {
      url: 'https://developers.wpengine.com',
      headers: {},
    } as any;

    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const getRefreshTokenSpy = jest
      .spyOn(cookie, 'getRefreshToken')
      .mockImplementation(() => 'current-rt');

    const endSpy = jest.spyOn(res, 'end');

    const authorizeResponse = {
      accessToken: 'at',
      accessTokenExpiration: new Date().getTime() + 300,
      refreshToken: 'rt',
      refreshTokenExpiration: new Date().getTime() + 10000,
    };

    const { wpUrl } = headlessConfig();

    fetchMock.post(`${wpUrl}/wp-json/wpac/v1/authorize`, {
      status: 200,
      body: JSON.stringify(authorizeResponse),
    });

    const cookieSpy = jest
      .spyOn(cookie, 'storeRefreshToken')
      .mockImplementation(() => {});

    await authorizeHandler(req, res);

    expect(getRefreshTokenSpy).toBeCalled();
    expect(getRefreshTokenSpy).toReturnWith('current-rt');
    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(endSpy).toBeCalledWith(JSON.stringify(authorizeResponse));

    expect(cookieSpy).toBeCalledWith(authorizeResponse.refreshToken, res, {
      request: req,
    });

    endSpy.mockRestore();
    fetchMock.restore();
    cookieSpy.mockRestore();
  });

  test('authorizeHandler will succeed when a code is provided without a refresh token', async () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const req: IncomingMessage = {
      url: 'https://developers.wpengine.com/?code=valid-authorization-code',
      headers: {},
    } as any;

    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const getRefreshTokenSpy = jest
      .spyOn(cookie, 'getRefreshToken')
      .mockImplementation(() => undefined);

    const endSpy = jest.spyOn(res, 'end');

    const authorizeResponse = {
      accessToken: 'at',
      accessTokenExpiration: new Date().getTime() + 300,
      refreshToken: 'rt',
      refreshTokenExpiration: new Date().getTime() + 10000,
    };

    const { wpUrl } = headlessConfig();

    fetchMock.post(`${wpUrl}/wp-json/wpac/v1/authorize`, {
      status: 200,
      body: authorizeResponse,
    });

    const cookieSpy = jest
      .spyOn(cookie, 'storeRefreshToken')
      .mockImplementation(() => {});

    await authorizeHandler(req, res);

    expect(getRefreshTokenSpy).toBeCalled();
    expect(getRefreshTokenSpy).toReturnWith(undefined);
    expect(endSpy).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(endSpy).toBeCalledWith(JSON.stringify(authorizeResponse));

    expect(cookieSpy).toBeCalledWith(authorizeResponse.refreshToken, res, {
      request: req,
    });

    endSpy.mockRestore();
    fetchMock.restore();
    cookieSpy.mockRestore();
  });
});
