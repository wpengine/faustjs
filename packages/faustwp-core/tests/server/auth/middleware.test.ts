import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import { IncomingMessage, ServerResponse } from 'http';
import {
	authorizeHandler,
	logoutHandler,
} from '../../../src/server/auth/middleware';
import * as getWpUrl from '../../../src/lib/getWpUrl';
import * as getWpSecret from '../../../src/lib/getWpSecret';

describe('auth/middleware', () => {
	test('authorizeHandler will send a 401 when there is no code or refresh token', async () => {
		const req: IncomingMessage = {
			headers: {},
		} as any;

		const res: ServerResponse = {
			setHeader() {},
			writeHead() {},
			end() {},
		} as any;

		const endSpy = jest.spyOn(res, 'end');

		await authorizeHandler(req, res);

		expect(endSpy).toBeCalled();
		expect(res.statusCode).toBe(401);
		expect(endSpy).toBeCalledWith(JSON.stringify({ error: 'Unauthorized' }));

		endSpy.mockRestore();
	});

	test('authorizeHandler will throw an error if the client secret is not defined', async () => {
		const req: IncomingMessage = {
			headers: {},
		} as any;

		const res: ServerResponse = {
			setHeader() {},
			writeHead() {},
			end() {},
		} as any;

		try {
			await authorizeHandler(req, res);
		} catch (e) {
			expect((e as Error).message).toContain(
				'The apiClientSecret must be specified',
			);
			console.log(e);
		}
	});

	test('authorizeHandler will throw a 401 if the request to WordPress authorize endpoint is not ok', async () => {
		const req: IncomingMessage = {
			url: 'https://developers.wpengine.com/?code=code',
			headers: {},
		} as any;

		const res: ServerResponse = {
			setHeader() {},
			writeHead() {},
			end() {},
		} as any;

		const endSpy = jest.spyOn(res, 'end');

		const wpUrl = 'http://my-wp-site.com';
		const getWpSecretSpy = jest
			.spyOn(getWpSecret, 'getWpSecret')
			.mockReturnValue('secret');
		const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

		fetchMock.post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
			status: 401,
			body: JSON.stringify({ error: 'some error' }),
		});

		await authorizeHandler(req, res);

		expect(endSpy).toBeCalled();
		expect(res.statusCode).toBe(401);
		expect(endSpy).toBeCalledWith(JSON.stringify({ error: 'some error' }));

		endSpy.mockRestore();
		fetchMock.restore();
	});

	test('authorizeHandler will fallback to deprecated authorize endpoint if first attempt is 404', async () => {
		const wpUrl = 'http://my-wp-site.com';
		const getWpSecretSpy = jest
			.spyOn(getWpSecret, 'getWpSecret')
			.mockReturnValue('secret');
		const getWpUrlSpy = jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);

		const req: IncomingMessage = {
			url: 'https://developers.wpengine.com/?code=code',
			headers: {},
		} as any;

		const res: ServerResponse = {
			setHeader() {},
			writeHead() {},
			end() {},
		} as any;

		const endSpy = jest.spyOn(res, 'end');
		const warningSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
		const successResponse = {
			message: 'Successfully called deprecated endpoint.',
			accessToken: 'valid-at',
			refreshToken: 'valid-rt',
			accessTokenExpiration: 10000,
			refreshTokenExpiration: 10000,
		};

		fetchMock
			.post(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
				status: 404,
				body: JSON.stringify({ error: 'Plugin out of date.' }),
			})
			.post(`${wpUrl}/?rest_route=/wpac/v1/authorize`, {
				status: 200,
				body: JSON.stringify(successResponse),
			});

		await authorizeHandler(req, res);

		expect(warningSpy).toBeCalled();
		expect(endSpy).toBeCalled();
		expect(res.statusCode).toBe(200);
		expect(endSpy).toBeCalledWith(JSON.stringify(successResponse));

		endSpy.mockRestore();
		warningSpy.mockRestore();
		fetchMock.restore();
	});

	test('logoutHandler expires the refresh token cookie', async () => {
		const req: IncomingMessage = {
			method: 'POST',
			headers: {},
		} as any;

		const res: ServerResponse = {
			setHeader() {},
			end() {},
		} as any;

		const setHeaderSpy = jest.spyOn(res, 'setHeader');

		await logoutHandler(req, res);

		expect(res.statusCode).toBe(205);
		expect(setHeaderSpy).toHaveBeenLastCalledWith(
			'Set-Cookie',
			expect.stringContaining('Expires=Thu, 01 Jan 1970 00:00:00 GMT'),
		);
		expect(setHeaderSpy).not.toHaveBeenLastCalledWith(
			'Set-Cookie',
			expect.stringContaining('Max-Age'),
		);

		setHeaderSpy.mockRestore();
	});

	describe('logoutHandler with a redirect_uri', () => {
		const wpUrl = 'http://my-wp-site.com';
		const refreshTokenCookie = `httpmy-wp-site.com-rt=${Buffer.from(
			'valid-rt',
		).toString('base64')}`;

		function logoutRequest(): IncomingMessage {
			return {
				method: 'POST',
				url: '/api/faust/auth/logout?redirect_uri=https%3A%2F%2Ffrontend.local%2F',
				headers: { cookie: refreshTokenCookie },
			} as any;
		}

		beforeEach(() => {
			jest.spyOn(getWpSecret, 'getWpSecret').mockReturnValue('secret');
			jest.spyOn(getWpUrl, 'getWpUrl').mockReturnValue(wpUrl);
		});

		afterEach(() => {
			jest.restoreAllMocks();
			fetchMock.restore();
		});

		test('returns the WordPress logout url from FaustWP', async () => {
			fetchMock.post(`${wpUrl}/?rest_route=/faustwp/v1/logout`, {
				status: 200,
				body: { logoutUrl: `${wpUrl}/?faust_logout=code` },
			});

			const res: ServerResponse = { setHeader() {}, end() {} } as any;
			const endSpy = jest.spyOn(res, 'end');

			await logoutHandler(logoutRequest(), res);

			expect(res.statusCode).toBe(200);
			expect(endSpy).toBeCalledWith(
				JSON.stringify({ wordpressLogoutUrl: `${wpUrl}/?faust_logout=code` }),
			);
			expect(JSON.parse(fetchMock.lastOptions()?.body as string)).toEqual({
				refreshToken: 'valid-rt',
				redirectUri: 'https://frontend.local/',
			});
		});

		test('uses the Application Password instead of the secret key when one is set', async () => {
			jest.spyOn(getWpSecret, 'getWpSecret').mockReturnValue(undefined);
			process.env.FAUST_APPLICATION_USER = 'frontend';
			process.env.FAUST_APPLICATION_PASSWORD = 'abcd efgh';
			fetchMock.post(`${wpUrl}/?rest_route=/faustwp/v1/logout`, {
				status: 200,
				body: { logoutUrl: `${wpUrl}/?faust_logout=code` },
			});

			const res: ServerResponse = { setHeader() {}, end() {} } as any;

			try {
				await logoutHandler(logoutRequest(), res);
			} finally {
				delete process.env.FAUST_APPLICATION_USER;
				delete process.env.FAUST_APPLICATION_PASSWORD;
			}

			const headers = fetchMock.lastOptions()?.headers as Record<
				string,
				string
			>;
			expect(res.statusCode).toBe(200);
			expect(headers.Authorization).toBe(
				`Basic ${Buffer.from('frontend:abcd efgh').toString('base64')}`,
			);
			expect(headers['x-faustwp-secret']).toBeUndefined();
		});

		test('falls back to a 205 when FaustWP has no logout endpoint', async () => {
			fetchMock.post(`${wpUrl}/?rest_route=/faustwp/v1/logout`, 404);

			const res: ServerResponse = { setHeader() {}, end() {} } as any;

			await logoutHandler(logoutRequest(), res);

			expect(res.statusCode).toBe(205);
		});
	});
});
