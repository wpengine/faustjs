import * as config from '../../src/config/config';
import { cookieKey, getAccessToken } from '../../src/auth/cookie';

describe('auth/cookie', () => {
  test('cookieKey() returns the key for cookie storage based on the wpUrl', () => {
    const spy = jest.spyOn(config, 'headlessConfig').mockImplementation(() => {
      return { wpUrl: 'test' };
    });

    expect(cookieKey()).toBe('test-at');
    expect(spy).toBeCalled();

    spy.mockRestore();
  });

  test('getAccessToken() returns undefined when there is no access token', () => {
    config.headlessConfig({
      wpUrl: 'test',
    });

    expect(getAccessToken()).toBeUndefined();
  });
});
