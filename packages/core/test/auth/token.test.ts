import {
  getAccessToken,
  getAccessTokenExpiration,
  setAccessToken,
} from '../../src/auth/token';
import { headlessConfig } from '../../src/config/config';

describe('auth/token', () => {
  test('getAccessToken() returns undefined when there is no access token', () => {
    headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
    });

    expect(getAccessToken()).toBeUndefined();
  });

  test('getAccessTokenExpiration() returns undefined when there is no expiration', () => {
    headlessConfig({
      wpUrl: 'test',
      authType: 'redirect',
      loginPagePath: '/login',
    });

    expect(getAccessTokenExpiration()).toBeUndefined();
  });

  test('setAccessToken() sets the access token', () => {
    const exp = Math.floor(Date.now() / 1000) + 1000;
    setAccessToken('test', exp);

    expect(getAccessToken()).toBe('test');
    expect(getAccessTokenExpiration()).toBe(exp);
  });
});
