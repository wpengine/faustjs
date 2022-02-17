import { IncomingMessage, ServerResponse } from 'http';
import { config } from '../../../src/config';
import { apiRouter } from '../../../src/server';
import * as middleware from '../../../src/server/auth/middleware';

describe('server/router', () => {
  test('req.url with /api/faust/auth/token calls the authorizeHandler', async () => {
    config({
      wpUrl: '',
    });

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
    config({
      wpUrl: '',
    });

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

  test('req.url with /api/faust/auth/logout calls the logoutHandler', async () => {
    config({
      wpUrl: '',
    });

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

  test('api router uses apiBasePath to route requests', async () => {
    config({
      wpUrl: '',
      apiBasePath: '/api/testing',
    });

    const authorizeHandlerReq: IncomingMessage = {
      url: '/api/testing/auth/token',
    } as any;

    const authorizeHandlerRes: ServerResponse = {
      end() {},
    } as any;

    const logoutHandlerReq: IncomingMessage = {
      url: '/api/testing/auth/logout',
    } as any;

    const logoutHandlerRes: ServerResponse = {
      end() {},
    } as any;

    const authorizeHandlerSpy = jest
      .spyOn(middleware, 'authorizeHandler')
      .mockImplementation(async () => {});

    const logoutHandlerSpy = jest
      .spyOn(middleware, 'logoutHandler')
      .mockImplementation(async () => {});

    await apiRouter(authorizeHandlerReq, authorizeHandlerRes);
    await apiRouter(logoutHandlerReq, logoutHandlerRes);

    expect(authorizeHandlerSpy).toBeCalledTimes(1);
    expect(logoutHandlerSpy).toBeCalledTimes(1);

    authorizeHandlerSpy.mockRestore();
    logoutHandlerSpy.mockRestore();
  });
});
