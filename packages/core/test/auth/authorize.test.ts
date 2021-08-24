import { trim } from 'lodash';
import {
  getAccessToken,
  getAccessTokenExpiration,
  headlessConfig,
  setAccessToken,
} from '../../src';
import * as authorize from '../../src/auth/authorize';

describe('auth/ensureAuthorization', () => {
  test('ensureAuthorization() returns true when an access token is successfully fetched', () => {
    headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const spy = jest
      .spyOn(authorize, 'fetchToken')
      .mockImplementation(async () => {
        return 'test';
      });

    expect(authorize.ensureAuthorization()).resolves.toBe(true);

    spy.mockRestore();
  });

  test('ensureAuthorization() return a redirect key when the token cannot be fetched', () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const { wpUrl } = headlessConfig();

    const redirectUri = 'http://localhost:3000';

    const spy = jest
      .spyOn(authorize, 'fetchToken')
      .mockImplementation(async () => {
        return null;
      });

    expect(
      authorize.ensureAuthorization({ redirectUri }),
    ).resolves.toStrictEqual({
      redirect: `${wpUrl}/generate?redirect_uri=${encodeURIComponent(
        redirectUri,
      )}`,
    });

    spy.mockRestore();
  });

  test('ensureAuthorization() returns a login key when the token cannot be fetched', () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const { loginPagePath } = headlessConfig();

    const loginPageUri = `/${trim(loginPagePath, '/')}`;

    expect(
      authorize.ensureAuthorization({ loginPageUri }),
    ).resolves.toStrictEqual({
      login: loginPageUri,
    });
  });

  test('ensureAuthorization() removes the "code" url param if it exists from the URL', () => {});
});

describe('auth/fetchToken', () => {
  test('fetchToken() throws an error when the apiEndpoint is not defined', () => {
    headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    expect(authorize.fetchToken()).rejects.toThrowError(
      'apiEndpoint is not defined',
    );
  });

  test('fetchToken() should clear the current access token/expiration upon failure', async () => {
    setAccessToken('test', new Date().getTime() + 1000);

    headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation((): any => {
        return Promise.reject();
      });

    authorize.fetchToken().then((token) => {
      expect(token).toBe(null);

      expect(getAccessToken()).toBe(undefined);
      expect(getAccessTokenExpiration()).toBe(undefined);
    });

    fetchSpy.mockRestore();
  });

  test('fetchToken() should set the token/expiration upon success', async () => {
    headlessConfig({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const exp = new Date().getTime() + 1000;

    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              accessToken: 'test',
              accessTokenExpiration: exp,
            }),
        }) as any as Response;
      });

    authorize.fetchToken().then((token) => {
      expect(token).resolves.toBe('test');

      expect(setAccessToken).toHaveBeenCalled();
      expect(getAccessToken()).toBe('test');
      expect(getAccessTokenExpiration()).toBe(exp);
    });

    fetchSpy.mockRestore();
  });

  test('fetchToken() should append the code query param to the fetch URL if provided', () => {
    headlessConfig({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async () => {
        return Promise.resolve({
          json: () => Promise.resolve({ accessToken: 'test' }),
        }) as any as Response;
      });

    fetchSpy.mockRestore();
  });
});
