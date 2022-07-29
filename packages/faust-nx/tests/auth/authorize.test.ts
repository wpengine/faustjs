import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { trim } from 'lodash';
import * as authorize from '../../src/auth/authorize';
import * as getWpUrl from '../../src/lib/getWpUrl';
import * as getWpSecret from '../../src/lib/getWpSecret';
import { setConfig } from 'next/config';
import { getConfig } from '../../src/config';

describe('auth/ensureAuthorization', () => {
  test('ensureAuthorization() returns true when an access token is successfully fetched', async () => {
    const wpUrl = 'http://test.local';
    const getWpSecretSpy = jest
      .spyOn(getWpSecret, 'getWpSecret')
      .mockReturnValue('secret');
    const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

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
    const wpUrl = 'http://test.local';
    const getWpSecretSpy = jest
      .spyOn(getWpSecret, 'getWpSecret')
      .mockReturnValue('secret');
    const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

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
    const wpUrl = 'http://test.local';
    const getWpSecretSpy = jest
      .spyOn(getWpSecret, 'getWpSecret')
      .mockReturnValue('secret');
    const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

    setConfig({
      loginPagePath: '/login',
    });

    const { loginPagePath } = getConfig();

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
