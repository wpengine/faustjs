import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { trim } from 'lodash';
import {
  getAccessToken,
  getAccessTokenExpiration,
  headlessConfig,
  setAccessToken,
} from '../../src';
import * as authorize from '../../src/auth/authorize';

describe('auth/ensureAuthorization', () => {
  test('ensureAuthorization() returns true when an access token is successfully fetched', async () => {
    headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    fetchMock.get('/api/auth/wpe-headless', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'at',
        accessTokenExpiration: new Date().getTime() + 300,
      }),
    });

    const result = await authorize.ensureAuthorization();
    expect(result).toBe(true);

    fetchMock.restore();
  });

  test('ensureAuthorization() return a redirect key when the token cannot be fetched', async () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const { wpUrl } = headlessConfig();

    const redirectUri = 'http://localhost:3000';

    fetchMock.get('/api/auth/wpe-headless', {
      status: 401,
    });

    expect(
      authorize.ensureAuthorization({ redirectUri }),
    ).resolves.toStrictEqual({
      redirect: `${wpUrl}/generate?redirect_uri=${encodeURIComponent(
        redirectUri,
      )}`,
    });

    fetchMock.restore();
  });

  test('ensureAuthorization() returns a login key when the token cannot be fetched', async () => {
    headlessConfig({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const { loginPagePath } = headlessConfig();

    const loginPageUri = `/${trim(loginPagePath, '/')}`;

    fetchMock.get('/api/auth/wpe-headless', {
      status: 401,
    });

    expect(
      authorize.ensureAuthorization({ loginPageUri }),
    ).resolves.toStrictEqual({
      login: loginPageUri,
    });

    fetchMock.restore();
  });
});

describe('auth/fetchToken', () => {
  test('fetchToken() should clear the current access token/expiration upon failure', async () => {
    setAccessToken('test', new Date().getTime() + 1000);

    headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
      apiEndpoint: '/auth',
    });

    fetchMock.get('/auth', {
      status: 401,
      ok: false,
      json: { error: 'Unauthorized' },
    });

    const token = await authorize.fetchToken();

    expect(token).toBe(undefined);
    expect(getAccessToken()).toBe(undefined);
    expect(getAccessTokenExpiration()).toBe(undefined);

    fetchMock.restore();
  });

  test('fetchToken() should set the token/expiration upon success', async () => {
    headlessConfig({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const exp = new Date().getTime() + 1000;

    fetchMock.get('/api/auth/wpe-headless', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
        accessTokenExpiration: exp,
      }),
    });

    const token = await authorize.fetchToken();

    expect(token).toBe('test');

    expect(getAccessToken()).toBe('test');
    expect(getAccessTokenExpiration()).toBe(exp);

    fetchMock.restore();
  });

  test('fetchToken() should append the code query param to the fetch URL if provided', async () => {
    headlessConfig({
      wpUrl: 'http://headless.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    fetchMock.get('/api/auth/wpe-headless', {
      status: 401,
      body: JSON.stringify({
        error: 'Unauthorized',
      }),
    });

    fetchMock.get('/api/auth/wpe-headless?code=valid-code', {
      status: 200,
      body: JSON.stringify({
        accessToken: 'test',
      }),
    });

    const token = await authorize.fetchToken('valid-code');

    expect(token).toBe('test');
    expect(getAccessToken()).toBe('test');

    fetchMock.restore();
  });
});
