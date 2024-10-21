import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { cookies } from 'next/headers.js';
import {
  onLogin,
  validationError,
} from '../../src/server-actions/loginAction.js';
import * as fetchTokens from '../../src/server/auth/fetchTokens.js';
import * as setRefreshToken from '../../src/server-actions/utils/setRefreshToken.js';
import { getGraphqlEndpoint } from '../../src/faust-core-utils.js';

// // https://github.com/aelbore/esbuild-jest/issues/26#issuecomment-893763840
const nextHeaders = { cookies };

jest.mock('next/headers.js');

describe('onLogout', () => {
  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.restore();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('returns validation errors', async () => {
    const nullFormData = {
      get(name: string) {
        if (name === 'usernameEmail') return null;
        if (name === 'password') return null;
      },
    };

    const noPasswordFormData = {
      get(name: string) {
        if (name === 'usernameEmail') return 'Admin';
        if (name === 'password') return null;
      },
    };

    const noUsernameFormData = {
      get(name: string) {
        if (name === 'usernameEmail') return null;
        if (name === 'password') return 'password';
      },
    };

    const invalidTypeFormData = {
      get(name: string) {
        if (name === 'usernameEmail') return 123;
        if (name === 'password') return 123;
      },
    };

    expect(await onLogin(nullFormData as any as FormData)).toStrictEqual(
      validationError,
    );
    expect(await onLogin(noPasswordFormData as any as FormData)).toStrictEqual(
      validationError,
    );
    expect(await onLogin(noUsernameFormData as any as FormData)).toStrictEqual(
      validationError,
    );
    expect(await onLogin(invalidTypeFormData as any as FormData)).toStrictEqual(
      validationError,
    );
  });

  it('returns the error received from graphql query if it exists', async () => {
    const validFormData = {
      get(name: string) {
        if (name === 'usernameEmail') return 'admin';
        if (name === 'password') return 'admin';
      },
    };

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    fetchMock.post(`${getGraphqlEndpoint()}`, {
      status: 200,
      body: JSON.stringify({
        data: {
          generateAuthorizationCode: {
            error: 'some error',
          },
        },
      }),
    });

    const res = await onLogin(validFormData as any as FormData);

    expect(res).toStrictEqual({ error: 'some error' });
  });

  it('properly logs in a user', async () => {
    const tokens = {
      accessToken: 'at',
      accessTokenExpiration: 1234,
      refreshToken: 'rt',
      refreshTokenExpiration: 1234,
    };

    const fetchTokensSpy = jest
      .spyOn(fetchTokens, 'fetchTokens')
      .mockImplementation(async () => tokens);

    const setRefreshTokenSpy = jest
      .spyOn(setRefreshToken, 'setRefreshToken')
      .mockImplementation();

    const validFormData = {
      get(name: string) {
        if (name === 'usernameEmail') return 'admin';
        if (name === 'password') return 'admin';
      },
    };

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    let authCode = '12345';

    fetchMock.post(`${getGraphqlEndpoint()}`, {
      status: 200,
      body: JSON.stringify({
        data: {
          generateAuthorizationCode: {
            code: authCode,
            error: null,
          },
        },
      }),
    });

    const res = await onLogin(validFormData as any as FormData);

    expect(res).toStrictEqual({ message: 'User was successfully logged in' });

    expect(fetchTokensSpy).toHaveBeenCalledWith(authCode);

    expect(setRefreshTokenSpy).toHaveBeenCalledWith(
      tokens.refreshToken,
      tokens.refreshTokenExpiration * 1000,
    );
  });
});
