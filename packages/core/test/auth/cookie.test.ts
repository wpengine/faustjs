import * as config from '../../src/config/config';
import { cookieKey, getRefreshToken } from '../../src/auth/server/cookie';

describe('auth/cookie', () => {
  test('cookieKey() returns the key for cookie storage based on the wpUrl', () => {
    const spy = jest.spyOn(config, 'headlessConfig').mockImplementation(() => {
      return { wpUrl: 'test', authType: 'redirect', loginPagePath: '/login' };
    });

    expect(cookieKey()).toBe('test-rt');
    expect(spy).toBeCalled();

    spy.mockRestore();
  });

  test('getRefreshToken() returns undefined when there is no refresh token', () => {
    config.headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
    });

    expect(getRefreshToken()).toBeUndefined();
  });
});
