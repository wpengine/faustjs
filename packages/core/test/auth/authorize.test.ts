import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { trim } from 'lodash';
import { config } from '../../src/config';
import * as authorize from '../../src/auth/authorize';

describe('auth/ensureAuthorization', () => {
  test('ensureAuthorization() returns true when an access token is successfully fetched', async () => {
    config({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    fetchMock.get('/api/faust/auth/token', {
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
    config({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const { wpUrl } = config();

    const redirectUri = 'http://localhost:3000';

    fetchMock.get('/api/faust/auth/token', {
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
    config({
      wpUrl: 'http://test.local',
      authType: 'redirect',
      loginPagePath: '/login',
      apiClientSecret: 'secret',
    });

    const { loginPagePath } = config();

    const loginPageUri = `/${trim(loginPagePath, '/')}`;

    fetchMock.get('/api/faust/auth/token', {
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
