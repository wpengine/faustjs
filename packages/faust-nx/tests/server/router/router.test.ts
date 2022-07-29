import { IncomingMessage, ServerResponse } from 'http';
import { apiRouter } from '../../../src/server';
import * as middleware from '../../../src/server/auth/middleware';

describe('server/router', () => {
  test('req.url with /api/faust/auth/token calls the authorizeHandler', async () => {
    const req: IncomingMessage = {
      url: '/api/faust/auth/token',
    } as any;

    const res: ServerResponse = {
      end() {},
    } as any;

    const authorizeHandlerSpy = jest
      .spyOn(middleware, 'authorizeHandler')
      .mockImplementation(async () => {});

    await apiRouter(req, res);

    expect(authorizeHandlerSpy).toBeCalled();

    authorizeHandlerSpy.mockRestore();
  });

  test('token route with a code url param calls the authorizeHandler', async () => {
    const req: IncomingMessage = {
      url: '/api/faust/auth/token?code=xxxx',
    } as any;

    const res: ServerResponse = {
      end() {},
    } as any;

    const authorizeHandlerSpy = jest
      .spyOn(middleware, 'authorizeHandler')
      .mockImplementation(async () => {});

    await apiRouter(req, res);

    expect(authorizeHandlerSpy).toBeCalled();

    authorizeHandlerSpy.mockRestore();
  });

  test('token route with trailing slash calls the authorizeHandler', async () => {
    const req: IncomingMessage = {
      url: '/api/faust/auth/token/?code=xxxx',
    } as any;

    const res: ServerResponse = {
      end() {},
    } as any;

    const authorizeHandlerSpy = jest
      .spyOn(middleware, 'authorizeHandler')
      .mockImplementation(async () => {});

    await apiRouter(req, res);

    expect(authorizeHandlerSpy).toBeCalled();

    authorizeHandlerSpy.mockRestore();
  });

  test('req.url with /api/faust/auth/logout calls the logoutHandler', async () => {
    const req: IncomingMessage = {
      url: '/api/faust/auth/logout',
    } as any;

    const res: ServerResponse = {
      end() {},
    } as any;

    const logoutHandlerSpy = jest
      .spyOn(middleware, 'logoutHandler')
      .mockImplementation(async () => {});

    await apiRouter(req, res);

    expect(logoutHandlerSpy).toBeCalled();

    logoutHandlerSpy.mockRestore();
  });
});
