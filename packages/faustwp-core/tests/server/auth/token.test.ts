import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { Cookies } from '../../../src/server/auth/cookie';
import { OAuth, OAuthTokens } from '../../../src/server/auth/token';
import * as getWpUrl from '../../../src/lib/getWpUrl';
import * as getWpSecret from '../../../src/lib/getWpSecret';

describe('server/auth/token (OAuth)', () => {
	const wpUrl = 'https://my-wp-site.com';
	let getWpUrlSpy: jest.SpyInstance;
	let getWpSecretSpy: jest.SpyInstance;

	beforeEach(() => {
		getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);
		getWpSecretSpy = jest
			.spyOn(getWpSecret, 'getWpSecret')
			.mockReturnValue('test-secret');
	});

	afterEach(() => {
		getWpUrlSpy.mockRestore();
		getWpSecretSpy.mockRestore();
		fetchMock.restore();
	});

	describe('constructor & tokenKey sanitization', () => {
		test('sanitizes URL according to RFC 6265 compliant cookie key', () => {
			const mockCookies = {
				getCookie: jest.fn(),
				setCookie: jest.fn(),
				removeCookie: jest.fn(),
			} as unknown as Cookies;

			const oauth = new OAuth(mockCookies);
			oauth.getRefreshToken();

			// 'https://my-wp-site.com' sanitized should strip ':' and '/' -> 'httpsmy-wp-site.com-rt'
			expect(mockCookies.getCookie).toHaveBeenCalledWith(
				'httpsmy-wp-site.com-rt',
			);
		});

		test('sanitizes URL with ports and nested paths properly', () => {
			getWpUrlSpy.mockReturnValue('http://localhost:8080/wp-core');

			const mockCookies = {
				getCookie: jest.fn(),
				setCookie: jest.fn(),
				removeCookie: jest.fn(),
			} as unknown as Cookies;

			const oauth = new OAuth(mockCookies);
			oauth.getRefreshToken();

			// 'http://localhost:8080/wp-core' -> 'httplocalhost8080wp-core-rt'
			expect(mockCookies.getCookie).toHaveBeenCalledWith(
				'httplocalhost8080wp-core-rt',
			);
		});
	});

	describe('getRefreshToken', () => {
		test('returns the refresh token from cookies', () => {
			const mockCookies = {
				getCookie: jest.fn().mockReturnValue('mock-refresh-token'),
			} as unknown as Cookies;

			const oauth = new OAuth(mockCookies);
			expect(oauth.getRefreshToken()).toBe('mock-refresh-token');
		});

		test('returns undefined when no refresh token cookie exists', () => {
			const mockCookies = {
				getCookie: jest.fn().mockReturnValue(undefined),
			} as unknown as Cookies;

			const oauth = new OAuth(mockCookies);
			expect(oauth.getRefreshToken()).toBeUndefined();
		});
	});

	describe('setRefreshToken', () => {
		test('calls removeCookie when token is undefined or empty string', () => {
			const mockCookies = {
				removeCookie: jest.fn(),
				setCookie: jest.fn(),
			} as unknown as Cookies;

			const oauth = new OAuth(mockCookies);

			oauth.setRefreshToken();
			expect(mockCookies.removeCookie).toHaveBeenCalledWith(
				'httpsmy-wp-site.com-rt',
			);

			oauth.setRefreshToken('');
			expect(mockCookies.removeCookie).toHaveBeenCalledTimes(2);
		});

		test('sets cookie with default maxAge when expires parameter is omitted', () => {
			const mockCookies = {
				setCookie: jest.fn(),
				removeCookie: jest.fn(),
			} as unknown as Cookies;

			const oauth = new OAuth(mockCookies);
			oauth.setRefreshToken('valid-rt-token');

			expect(mockCookies.setCookie).toHaveBeenCalledWith(
				'httpsmy-wp-site.com-rt',
				'valid-rt-token',
				{
					expires: undefined,
					maxAge: 2592000,
					path: '/',
					sameSite: 'strict',
					secure: true,
					httpOnly: true,
				},
			);
		});

		test('sets cookie with Date expiration and undefined maxAge when numeric expires timestamp is passed', () => {
			const mockCookies = {
				setCookie: jest.fn(),
				removeCookie: jest.fn(),
			} as unknown as Cookies;

			const oauth = new OAuth(mockCookies);
			const timestampSeconds = 1700000000;
			oauth.setRefreshToken('valid-rt-token', timestampSeconds);

			expect(mockCookies.setCookie).toHaveBeenCalledWith(
				'httpsmy-wp-site.com-rt',
				'valid-rt-token',
				{
					expires: new Date(timestampSeconds * 1000),
					maxAge: undefined,
					path: '/',
					sameSite: 'strict',
					secure: true,
					httpOnly: true,
				},
			);
		});
	});

	describe('isOAuthTokens', () => {
		const mockCookies = {} as unknown as Cookies;
		const oauth = new OAuth(mockCookies);

		test('returns true for a well-formed OAuthTokens object', () => {
			const validTokens: OAuthTokens = {
				accessToken: 'test-access-token',
				accessTokenExpiration: 3600,
				refreshToken: 'test-refresh-token',
				refreshTokenExpiration: 86400,
			};

			expect(oauth.isOAuthTokens(validTokens)).toBe(true);
		});

		test('returns false for null or undefined', () => {
			expect(oauth.isOAuthTokens(null)).toBe(false);
			expect(oauth.isOAuthTokens(undefined)).toBe(false);
		});

		test('returns false for non-object primitive values', () => {
			expect(oauth.isOAuthTokens('string')).toBe(false);
			expect(oauth.isOAuthTokens(12345)).toBe(false);
			expect(oauth.isOAuthTokens(true)).toBe(false);
		});

		test('returns false when required fields are missing or have invalid types', () => {
			expect(
				oauth.isOAuthTokens({
					accessToken: 'at',
					refreshToken: 'rt',
					accessTokenExpiration: 123,
					// missing refreshTokenExpiration
				}),
			).toBe(false);

			expect(
				oauth.isOAuthTokens({
					accessToken: 'at',
					refreshToken: 'rt',
					accessTokenExpiration: 'not-a-number',
					refreshTokenExpiration: 123,
				}),
			).toBe(false);

			expect(
				oauth.isOAuthTokens({
					accessToken: 123,
					refreshToken: 'rt',
					accessTokenExpiration: 100,
					refreshTokenExpiration: 200,
				}),
			).toBe(false);
		});
	});

	describe('fetch', () => {
		test('throws an error if apiClientSecret is not defined', async () => {
			getWpSecretSpy.mockReturnValue('');

			const mockCookies = {} as unknown as Cookies;
			const oauth = new OAuth(mockCookies);

			await expect(oauth.fetch('test-code')).rejects.toThrow(
				'The apiClientSecret must be specified to use the auth middleware',
			);
		});

		test('successfully fetches tokens from primary endpoint', async () => {
			const mockCookies = {
				getCookie: jest.fn().mockReturnValue('current-rt'),
			} as unknown as Cookies;

			const expectedTokens: OAuthTokens = {
				accessToken: 'new-at',
				accessTokenExpiration: 3600,
				refreshToken: 'new-rt',
				refreshTokenExpiration: 86400,
			};

			fetchMock.post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
				status: 200,
				body: JSON.stringify(expectedTokens),
			});

			const oauth = new OAuth(mockCookies);
			const result = await oauth.fetch('auth-code-123');

			expect(result).toEqual(expectedTokens);

			const lastCall = fetchMock.lastCall(
				`${wpUrl}/?rest_route=/faustwp/v1/authorize`,
			);
			expect(lastCall).toBeDefined();
			expect(lastCall?.[1]?.headers).toEqual({
				'Content-Type': 'application/json',
				'x-faustwp-secret': 'test-secret',
			});
			expect(JSON.parse(lastCall?.[1]?.body as string)).toEqual({
				code: 'auth-code-123',
				refreshToken: 'current-rt',
			});
		});

		test('returns error object when primary endpoint returns non-200 non-404 status', async () => {
			const mockCookies = {
				getCookie: jest.fn().mockReturnValue(undefined),
			} as unknown as Cookies;

			fetchMock.post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
				status: 401,
				body: JSON.stringify({ message: 'Invalid secret' }),
			});

			const oauth = new OAuth(mockCookies);
			const result: any = await oauth.fetch('invalid-code');

			expect(result.error).toBe(true);
			expect(result.result).toEqual({ message: 'Invalid secret' });
			expect(result.response.status).toBe(401);
		});

		test('falls back to deprecated endpoint when primary returns 404 and logs warning on success', async () => {
			const mockCookies = {
				getCookie: jest.fn().mockReturnValue('stored-rt'),
			} as unknown as Cookies;

			const deprecatedTokens: OAuthTokens = {
				accessToken: 'legacy-at',
				accessTokenExpiration: 1800,
				refreshToken: 'legacy-rt',
				refreshTokenExpiration: 43200,
			};

			const warningSpy = jest
				.spyOn(console, 'log')
				.mockImplementation(jest.fn());

			fetchMock
				.post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
					status: 404,
					body: JSON.stringify({ code: 'rest_no_route' }),
				})
				.post(`${wpUrl}/?rest_route=/wpac/v1/authorize`, {
					status: 200,
					body: JSON.stringify(deprecatedTokens),
				});

			const oauth = new OAuth(mockCookies);
			const result = await oauth.fetch('test-code');

			expect(result).toEqual(deprecatedTokens);
			expect(warningSpy).toHaveBeenCalled();
			const loggedMessage = warningSpy.mock.calls.flat().join(' ');
			expect(loggedMessage).toContain(
				'Authentication and post previews will soon be incompatible',
			);

			const fallbackCall = fetchMock.lastCall(
				`${wpUrl}/?rest_route=/wpac/v1/authorize`,
			);
			expect(fallbackCall?.[1]?.headers).toEqual({
				'Content-Type': 'application/json',
				'x-wpe-headless-secret': 'test-secret',
			});

			warningSpy.mockRestore();
		});

		test('returns error when fallback endpoint returns non-ok response without warning if 404', async () => {
			const mockCookies = {
				getCookie: jest.fn().mockReturnValue(undefined),
			} as unknown as Cookies;

			const warningSpy = jest
				.spyOn(console, 'log')
				.mockImplementation(jest.fn());

			fetchMock
				.post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
					status: 404,
					body: JSON.stringify({ error: 'Not found' }),
				})
				.post(`${wpUrl}/?rest_route=/wpac/v1/authorize`, {
					status: 404,
					body: JSON.stringify({ error: 'Neither endpoint found' }),
				});

			const oauth = new OAuth(mockCookies);
			const result: any = await oauth.fetch();

			expect(result.error).toBe(true);
			expect(result.response.status).toBe(404);
			expect(result.result).toEqual({ error: 'Neither endpoint found' });
			expect(warningSpy).not.toHaveBeenCalled();

			warningSpy.mockRestore();
		});
	});
});
