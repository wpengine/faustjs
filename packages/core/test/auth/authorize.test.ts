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
