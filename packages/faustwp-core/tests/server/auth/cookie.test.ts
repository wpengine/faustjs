import { IncomingMessage, ServerResponse } from 'http';
import cookie from 'cookie';
import { Cookies } from '../../../src/server/auth/cookie';
import { base64Encode } from '../../../src/utils';

describe('server/auth/cookie', () => {
	describe('constructor', () => {
		test('parses cookie header when present on incoming request', () => {
			const req: IncomingMessage = {
				headers: {
					cookie: 'test_key=test_val; other_key=other_val',
				},
			} as any;

			const cookies = new Cookies(req);
			expect(cookies.getCookie('test_key', { encoded: false })).toBe(
				'test_val',
			);
			expect(cookies.getCookie('other_key', { encoded: false })).toBe(
				'other_val',
			);
		});

		test('handles missing cookie header gracefully without errors', () => {
			const req: IncomingMessage = {
				headers: {},
			} as any;

			const cookies = new Cookies(req);
			expect(cookies.getCookie('nonexistent')).toBeUndefined();
		});
	});

	describe('getCookie', () => {
		test('returns undefined for non-existent cookie key', () => {
			const req: IncomingMessage = {
				headers: {
					cookie: 'existing_key=val',
				},
			} as any;

			const cookies = new Cookies(req);
			expect(cookies.getCookie('unknown_key')).toBeUndefined();
		});

		test('returns base64-decoded string by default', () => {
			const rawVal = 'hello world';
			const encodedVal = base64Encode(rawVal);

			const req: IncomingMessage = {
				headers: {
					cookie: `auth_token=${encodedVal}`,
				},
			} as any;

			const cookies = new Cookies(req);
			expect(cookies.getCookie('auth_token')).toBe(rawVal);
			expect(cookies.getCookie('auth_token', { encoded: true })).toBe(rawVal);
		});

		test('returns raw string when encoded is false', () => {
			const rawVal = 'plain_string_value';

			const req: IncomingMessage = {
				headers: {
					cookie: `plain_key=${rawVal}`,
				},
			} as any;

			const cookies = new Cookies(req);
			expect(cookies.getCookie('plain_key', { encoded: false })).toBe(rawVal);
		});

		test('parses and returns JSON object when isJson is true and encoded is true', () => {
			const payload = { userId: 42, role: 'administrator', active: true };
			const encodedVal = base64Encode(JSON.stringify(payload));

			const req: IncomingMessage = {
				headers: {
					cookie: `user_session=${encodedVal}`,
				},
			} as any;

			const cookies = new Cookies(req);
			const result = cookies.getCookie('user_session', {
				encoded: true,
				isJson: true,
			});
			expect(result).toEqual(payload);
		});

		test('parses and returns JSON object when isJson is true and encoded is false', () => {
			const payload = { preferences: { theme: 'dark' }, tags: ['wp', 'faust'] };
			const jsonStr = JSON.stringify(payload);

			const req: IncomingMessage = {
				headers: {
					cookie: cookie.serialize('prefs', jsonStr),
				},
			} as any;

			const cookies = new Cookies(req);
			const result = cookies.getCookie('prefs', {
				encoded: false,
				isJson: true,
			});
			expect(result).toEqual(payload);
		});
	});

	describe('setCookie', () => {
		test('sets base64-encoded cookie and updates response header by default', () => {
			const req: IncomingMessage = {
				headers: {},
			} as any;

			const setHeaderSpy = jest.fn();
			const res: ServerResponse = {
				setHeader: setHeaderSpy,
			} as any;

			const cookies = new Cookies(req, res);
			cookies.setCookie('session_id', 'secret123');

			const expectedEncoded = base64Encode('secret123');
			expect(setHeaderSpy).toHaveBeenCalledWith(
				'Set-Cookie',
				cookie.serialize('session_id', expectedEncoded),
			);
			expect(cookies.getCookie('session_id')).toBe('secret123');
		});

		test('sets unencoded cookie when encoded is false', () => {
			const req: IncomingMessage = {
				headers: {},
			} as any;

			const setHeaderSpy = jest.fn();
			const res: ServerResponse = {
				setHeader: setHeaderSpy,
			} as any;

			const cookies = new Cookies(req, res);
			cookies.setCookie('raw_key', 'raw_value', { encoded: false });

			expect(setHeaderSpy).toHaveBeenCalledWith(
				'Set-Cookie',
				cookie.serialize('raw_key', 'raw_value'),
			);
			expect(cookies.getCookie('raw_key', { encoded: false })).toBe(
				'raw_value',
			);
		});

		test('serializes object to JSON before setting cookie when isJson is true', () => {
			const req: IncomingMessage = {
				headers: {},
			} as any;

			const setHeaderSpy = jest.fn();
			const res: ServerResponse = {
				setHeader: setHeaderSpy,
			} as any;

			const data = { theme: 'night', fontSize: 16 };
			const cookies = new Cookies(req, res);
			cookies.setCookie('ui_settings', data, {
				isJson: true,
				encoded: true,
			});

			const expectedEncoded = base64Encode(JSON.stringify(data));
			expect(setHeaderSpy).toHaveBeenCalledWith(
				'Set-Cookie',
				cookie.serialize('ui_settings', expectedEncoded),
			);
			expect(
				cookies.getCookie('ui_settings', { encoded: true, isJson: true }),
			).toEqual(data);
		});

		test('applies custom serialize options to Set-Cookie header', () => {
			const req: IncomingMessage = {
				headers: {},
			} as any;

			const setHeaderSpy = jest.fn();
			const res: ServerResponse = {
				setHeader: setHeaderSpy,
			} as any;

			const cookies = new Cookies(req, res);
			const expiresDate = new Date('2030-01-01T00:00:00.000Z');

			cookies.setCookie('secure_token', 'my_token', {
				encoded: false,
				path: '/api',
				sameSite: 'strict',
				secure: true,
				httpOnly: true,
				maxAge: 3600,
				expires: expiresDate,
			});

			expect(setHeaderSpy).toHaveBeenCalledWith(
				'Set-Cookie',
				cookie.serialize('secure_token', 'my_token', {
					path: '/api',
					sameSite: 'strict',
					secure: true,
					httpOnly: true,
					maxAge: 3600,
					expires: expiresDate,
				}),
			);
		});

		test('does not throw when response object is omitted', () => {
			const req: IncomingMessage = {
				headers: {},
			} as any;

			const cookies = new Cookies(req);
			expect(() => {
				cookies.setCookie('res_undefined', 'val');
			}).not.toThrow();

			expect(cookies.getCookie('res_undefined')).toBe('val');
		});
	});

	describe('removeCookie', () => {
		test('deletes cookie from cache and sets expired Set-Cookie header', () => {
			const initialVal = base64Encode('initial_val');
			const req: IncomingMessage = {
				headers: {
					cookie: `to_delete=${initialVal}`,
				},
			} as any;

			const setHeaderSpy = jest.fn();
			const res: ServerResponse = {
				setHeader: setHeaderSpy,
			} as any;

			const cookies = new Cookies(req, res);
			expect(cookies.getCookie('to_delete')).toBe('initial_val');

			cookies.removeCookie('to_delete');

			expect(cookies.getCookie('to_delete')).toBeUndefined();
			expect(setHeaderSpy).toHaveBeenCalledWith(
				'Set-Cookie',
				cookie.serialize('to_delete', '', {
					path: '/',
					sameSite: 'strict',
					secure: true,
					httpOnly: true,
					expires: new Date(0),
				}),
			);
		});

		test('does not throw when response is omitted during removeCookie', () => {
			const req: IncomingMessage = {
				headers: {
					cookie: 'no_res_key=val',
				},
			} as any;

			const cookies = new Cookies(req);
			expect(() => {
				cookies.removeCookie('no_res_key');
			}).not.toThrow();
			expect(cookies.getCookie('no_res_key')).toBeUndefined();
		});
	});
});
