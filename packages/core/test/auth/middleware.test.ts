import { IncomingMessage, ServerResponse } from 'http';
import * as cookie from '../../src/auth/cookie';
import * as authorize from '../../src/auth/authorize';
import {
  redirect,
  authorizeHandler
} from '../../src/auth/middleware';

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

  test('authorizeHandler will send a 302 when there is no code and there is a redirectUri', async () => {
    const authorizeSpy = jest.spyOn(authorize, 'ensureAuthorization').mockImplementation(() => {
      return {
        redirect: 'https://developers.wpengine.com/auth',
      }
    });
    const req: IncomingMessage = {
      url: `https://developers.wpengine.com/?redirect_uri=${encodeURIComponent('https://developers.wpengine.com/')}`,
      headers: {
        host: 'developers.wpengine.com',
      }
    } as any;
    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const writeHeadSpy = jest.spyOn(res, 'writeHead');
    const endSpy = jest.spyOn(res, 'end');


    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(authorizeSpy).toBeCalled();
    expect(writeHeadSpy).toBeCalledWith(302, {
      Location: 'https://developers.wpengine.com/auth',
    });

    authorizeSpy.mockRestore();
  });

  test('authorizeHandler will send a 302 when there is no code and there is already an access token', async () => {
    const authorizeSpy = jest.spyOn(authorize, 'ensureAuthorization').mockImplementation(() => {
      return 'wptest-at'
    });
    const req: IncomingMessage = {
      url: `https://developers.wpengine.com/?redirect_uri=${encodeURIComponent('/posts')}`,
      headers: {
        host: 'developers.wpengine.com',
      }
    } as any;
    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const writeHeadSpy = jest.spyOn(res, 'writeHead');
    const endSpy = jest.spyOn(res, 'end');


    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(authorizeSpy).toBeCalled();
    expect(writeHeadSpy).toBeCalledWith(302, {
      Location: 'https://developers.wpengine.com/posts',
    });

    authorizeSpy.mockRestore();
  });

  test('authorizeHandler will send a 401 when there is no code, no access token, and no redirect uri', async () => {
    const authorizeSpy = jest.spyOn(authorize, 'ensureAuthorization');
    const req: IncomingMessage = {
      url: 'https://developers.wpengine.com/',
      headers: {
        host: 'developers.wpengine.com',
      }
    } as any;
    const res: ServerResponse = {
      end() {},
    } as any;
    const endSpy = jest.spyOn(res, 'end');


    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(authorizeSpy).not.toBeCalled();
    expect(res.statusCode).toBe(401);

    authorizeSpy.mockRestore();
  });

  test('authorizeHandler will store a new access token when a code is sent', async () => {
    const authorizeSpy = jest.spyOn(authorize, 'authorize').mockImplementation(() => {
      return Promise.resolve({
        access_token: 'wptest-at'
      });
    });
    const cookieSpy = jest.spyOn(cookie, 'storeAccessToken').mockImplementation(() => {});
    const req: IncomingMessage = {
      url: `https://developers.wpengine.com/?code=123&redirect_uri=${encodeURIComponent('https://developers.wpengine.com/posts')}`,
      headers: {
        host: 'developers.wpengine.com',
      }
    } as any;
    const res: ServerResponse = {
      writeHead() {},
      end() {},
    } as any;

    const writeHeadSpy = jest.spyOn(res, 'writeHead');
    const endSpy = jest.spyOn(res, 'end');

    await authorizeHandler(req, res);

    expect(endSpy).toBeCalled();
    expect(authorizeSpy).toBeCalledWith('123');
    expect(cookieSpy).toBeCalledWith('wptest-at', res, {
      request: req,
    });
    expect(writeHeadSpy).toBeCalledWith(302, {
      Location: 'https://developers.wpengine.com/posts',
    });

    authorizeSpy.mockRestore();
    cookieSpy.mockRestore();
  });
});
