import * as config from '../../src/config/config';
import * as cookies from '../../src/auth/cookie';
import { authorize, ensureAuthorization } from '../../src/auth/authorize';

describe('auth/authorize', () => {
  test('authorize() throws an error when there is no API secret', async () => {
    const spy = jest.spyOn(config, 'headlessConfig').mockImplementation(() => {
      return { wpUrl: 'test' };
    });

    await expect(authorize('test')).rejects.toThrowError();
    expect(spy).toBeCalled();

    spy.mockRestore();
  });

  test('ensureAuthorization() throws an error if there is no configured API endpoint', () => {
    const spy = jest.spyOn(config, 'headlessConfig').mockImplementation(() => {
      return {
        wpUrl: 'https://developers.wpengine.com',
      };
    });

    expect(() => ensureAuthorization('/test')).toThrowError();
    expect(spy).toBeCalled();

    spy.mockRestore();
  });

  test('ensureAuthorization() returns an access token when it exists', () => {
    const spy = jest.spyOn(config, 'headlessConfig').mockImplementation(() => {
      return {
        wpUrl: 'https://developers.wpengine.com',
        apiUrl: 'https://developers.wpengine.com',
        apiEndpoint: '/auth',
      };
    });
    const accessTokenSpy = jest
      .spyOn(cookies, 'getAccessToken')
      .mockImplementation(() => {
        return 'test';
      });

    expect(ensureAuthorization('/test')).toBe('test');
    expect(accessTokenSpy).toBeCalledWith(undefined);
    expect(spy).toBeCalled();

    spy.mockRestore();
    accessTokenSpy.mockRestore();
  });

  test('ensureAuthorization() throws an error if it cannot parse the redirect URI and it needs to redirect', () => {
    const spy = jest.spyOn(config, 'headlessConfig').mockImplementation(() => {
      return {
        wpUrl: 'https://developers.wpengine.com',
        apiEndpoint: '/auth',
      };
    });
    const accessTokenSpy = jest
      .spyOn(cookies, 'getAccessToken')
      .mockImplementation(() => {
        return undefined;
      });

    expect(() => ensureAuthorization('')).toThrowError();
    expect(accessTokenSpy).toBeCalledWith(undefined);

    spy.mockRestore();
    accessTokenSpy.mockRestore();
  });

  test('ensureAuthorization() to return an object that can redirect to generate an auth code when necessary', () => {
    const spy = jest.spyOn(config, 'headlessConfig').mockImplementation(() => {
      return {
        wpUrl: 'https://developers.wpengine.com',
        apiUrl: 'https://developers.wpengine.com',
        apiEndpoint: '/auth',
      };
    });
    const accessTokenSpy = jest
      .spyOn(cookies, 'getAccessToken')
      .mockImplementation(() => {
        return undefined;
      });

    expect(ensureAuthorization('https://developers.wpengine.com')).toEqual({
      redirect: `https://developers.wpengine.com/generate?redirect_uri=${encodeURIComponent(
        `https://developers.wpengine.com/auth?redirect_uri=${encodeURIComponent(
          'https://developers.wpengine.com',
        )}`,
      )}`,
    });
    expect(accessTokenSpy).toBeCalledWith(undefined);

    spy.mockRestore();
    accessTokenSpy.mockRestore();
  });
});
