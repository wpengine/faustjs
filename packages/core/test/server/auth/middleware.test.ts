import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { IncomingMessage, ServerResponse } from 'http';
import { config } from '../../../src/config';
import {
  authorizeHandler,
  redirect,
} from '../../../src/server/auth/middleware';

describe('auth/middleware', () => {
  test('redirect will write a 302', () => {
    const res: ServerResponse = {
      setHeader() {},
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
    config({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

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
    config({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
    });

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
    config({
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
      setHeader() {},
      writeHead() {},
      end() {},
    } as any;

    const endSpy = jest.spyOn(res, 'end');

    const { wpUrl } = config();

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
});
