/**
 * @jest-environment jsdom
 */

import { act, renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { useAuth } from '../../src/hooks/useAuth';
import { setAccessToken } from '../../src/auth';

// Apollo Client 4 appends an extensions param, so match on the start of the URL.
const VIEWER_URL = `begin:http://headless.local/index.php?graphql&query=query%20GetFaustViewer%20%7B%0A%20%20viewer%20%7B%0A%20%20%20%20name%0A%20%20%20%20username%0A%20%20%20%20capabilities%0A%20%20%20%20databaseId%0A%20%20%20%20description%0A%20%20%20%20email%0A%20%20%20%20firstName%0A%20%20%20%20id%0A%20%20%20%20lastName%0A%20%20%20%20nickname%0A%20%20%20%20locale%0A%20%20%20%20registeredDate%0A%20%20%20%20slug%0A%20%20%20%20templates%0A%20%20%20%20uri%0A%20%20%20%20url%0A%20%20%20%20userId%0A%20%20%20%20avatar%20%7B%0A%20%20%20%20%20%20url%0A%20%20%20%20%20%20__typename%0A%20%20%20%20%7D%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D&operationName=GetFaustViewer&variables=%7B%7D`;

/**
 * A viewer with every field useAuth asks for, so Apollo can answer the query from its cache.
 */
function fullViewer(id: number, username: string) {
	return {
		__typename: 'User',
		name: username,
		username,
		capabilities: [],
		databaseId: id,
		description: '',
		email: `${username}@example.com`,
		firstName: '',
		id: `user-${id}`,
		lastName: '',
		nickname: username,
		locale: 'en_US',
		registeredDate: '',
		slug: username,
		templates: [],
		uri: '',
		url: '',
		userId: id,
		avatar: { __typename: 'Avatar', url: '' },
	};
}

describe('useAuth hook', () => {
	const envBackup = process.env;

	beforeAll(() => {
		process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';
	});

	afterAll(() => {
		process.env = envBackup;
	});

	afterEach(() => {
		setAccessToken(undefined, undefined);
		fetchMock.restore();
	});

	it('skips authentication check when skip is true', async () => {
		// Set up the fetch mock but expect it not to be called
		fetchMock.get(`/api/faust/auth/token`, {
			status: 200,
			body: JSON.stringify({ accessToken: 'at', refreshToken: 'rt' }),
		});

		const { result } = renderHook(() => useAuth({ skip: true }));

		// The hook should skip the authentication check
		expect(result.current.isAuthenticated).toStrictEqual(null);
		expect(result.current.isReady).toStrictEqual(false);

		// Ensure the token endpoint was not called
		expect(fetchMock.called(`/api/faust/auth/token`)).toBe(false);
	});

	it('performs authentication check by default (skip not provided)', async () => {
		// Mock a valid response
		fetchMock.get(`/api/faust/auth/token`, {
			status: 200,
			body: JSON.stringify({ accessToken: 'at', refreshToken: 'rt' }),
		});
		fetchMock.get(VIEWER_URL, {
			status: 200,
			body: JSON.stringify({
				data: {
					viewer: {
						name: 'admin',
						username: 'admin',
						capabilities: ['administrator'],
						databaseId: 1,
						description: '',
						email: '',
					},
				},
			}),
		});

		const { result } = renderHook(() => useAuth());

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(true);
			expect(result.current.isReady).toStrictEqual(true);
		});
	});

	it('Provides the proper login url with redirect strategy', async () => {
		const { result } = renderHook(() => useAuth());

		await waitFor(() => {
			expect(result.current.loginUrl).toEqual(
				'http://headless.local/generate?redirect_uri=http%3A%2F%2Flocalhost%2F',
			);
		});
	});

	it('Provides the proper login url with local strategy', async () => {
		const { result } = renderHook(() =>
			useAuth({
				strategy: 'local',
				loginPageUrl: '/login',
			}),
		);

		await waitFor(() => {
			expect(result.current.loginUrl).toEqual(
				'/login?redirect_uri=http%3A%2F%2Flocalhost%2F',
			);
		});
	});

	it('ensures isAuthenticated is not available until isReady', async () => {
		const { result } = renderHook(() => useAuth());

		expect(result.current.isAuthenticated).toStrictEqual(null);
		expect(result.current.isReady).toStrictEqual(false);

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
			expect(result.current.isReady).toStrictEqual(true);
		});
	});

	it('ensures strategy local requires a "loginPageUrl"', () => {
		expect(() =>
			useAuth({
				strategy: 'local',
			} as any),
		).toThrowError('useAuth: Local strategies must specify the "loginPageUrl"');
	});

	it('returns isAuthenticated true when token endpoint returns valid tokens', async () => {
		// Mock a valid response from the token endpoint.
		fetchMock.get(`/api/faust/auth/token`, {
			status: 200,
			body: JSON.stringify({
				accessToken: 'at',
				refreshToken: 'rt',
			}),
		});

		fetchMock.get(VIEWER_URL, {
			status: 200,
			body: JSON.stringify({
				data: {
					viewer: {
						name: 'admin',
						username: 'admin',
						capabilities: ['administrator'],
						databaseId: 1,
						description: '',
						email: '',
					},
				},
			}),
		});

		const { result } = renderHook(() => useAuth());

		expect(result.current.isAuthenticated).toStrictEqual(null);

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(true);
		});
	});

	it('returns isAuthenticated false when token endpoint returns 401', async () => {
		// Mock a valid response from the token endpoint.
		fetchMock.get(`/api/faust/auth/token`, {
			status: 401,
			body: JSON.stringify({ error: 'Unauthorized' }),
		});

		const { result } = renderHook(() => useAuth());

		expect(result.current.isAuthenticated).toStrictEqual(null);

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
		});
	});

	it('returns the viewer object', () => {
		const { result } = renderHook(() => useAuth());
		expect(result.current.viewer).toBeDefined();
	});

	it('updates isAuthenticated and viewer after logging in without a reload', async () => {
		fetchMock.get(`/api/faust/auth/token`, {
			status: 401,
			body: JSON.stringify({ error: 'Unauthorized' }),
		});
		fetchMock.get(VIEWER_URL, {
			status: 200,
			body: JSON.stringify({
				data: { viewer: { name: 'admin', username: 'admin' } },
			}),
		});

		const { result } = renderHook(() => useAuth());

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
		});

		// useLogin() stores the access token after a successful login.
		act(() => {
			setAccessToken('at', Math.floor(Date.now() / 1000) + 300);
		});

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(true);
			expect(result.current.viewer?.username).toStrictEqual('admin');
		});

		act(() => {
			setAccessToken(undefined, undefined);
		});

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
			expect(result.current.viewer).toStrictEqual(null);
		});
	});

	it('fetches the new viewer when a different user logs in', async () => {
		fetchMock.get(`/api/faust/auth/token`, {
			status: 401,
			body: JSON.stringify({ error: 'Unauthorized' }),
		});
		fetchMock.get(
			VIEWER_URL,
			{ status: 200, body: { data: { viewer: fullViewer(1, 'first') } } },
			{ repeat: 1 },
		);

		const { result } = renderHook(() => useAuth());
		const login = () =>
			act(() => {
				setAccessToken('at', Math.floor(Date.now() / 1000) + 300);
			});

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
		});

		login();
		await waitFor(() => {
			expect(result.current.viewer?.username).toStrictEqual('first');
		});

		act(() => {
			setAccessToken(undefined, undefined);
		});
		fetchMock.get(
			VIEWER_URL,
			{ status: 200, body: { data: { viewer: fullViewer(2, 'second') } } },
			{ overwriteRoutes: false },
		);

		login();
		await waitFor(() => {
			expect(result.current.viewer?.username).toStrictEqual('second');
		});
	});

	it('catches up with logins and logouts that happened while skipped', async () => {
		fetchMock.get(`/api/faust/auth/token`, {
			status: 401,
			body: JSON.stringify({ error: 'Unauthorized' }),
		});
		fetchMock.get(VIEWER_URL, {
			status: 200,
			body: { data: { viewer: fullViewer(1, 'first') } },
		});

		const { result, rerender } = renderHook(({ skip }) => useAuth({ skip }), {
			initialProps: { skip: false },
		});

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
		});

		rerender({ skip: true });
		act(() => {
			setAccessToken('at', Math.floor(Date.now() / 1000) + 300);
		});
		rerender({ skip: false });

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(true);
		});

		rerender({ skip: true });
		act(() => {
			setAccessToken(undefined, undefined);
		});
		rerender({ skip: false });

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
		});
	});

	it('provides a login url when an authenticated session ends', async () => {
		setAccessToken('at', Math.floor(Date.now() / 1000) + 300);
		fetchMock.get(VIEWER_URL, {
			status: 200,
			body: { data: { viewer: fullViewer(1, 'first') } },
		});

		const { result } = renderHook(() => useAuth());

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(true);
		});
		expect(result.current.loginUrl).toStrictEqual(null);

		// For example, refreshing the access token failed.
		act(() => {
			setAccessToken(undefined, undefined);
		});

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
			expect(result.current.loginUrl).toStrictEqual(
				'http://headless.local/generate?redirect_uri=http%3A%2F%2Flocalhost%2F',
			);
		});
	});

	it("ignores the previous user's viewer when it arrives after an account switch", async () => {
		fetchMock.get(`/api/faust/auth/token`, {
			status: 401,
			body: JSON.stringify({ error: 'Unauthorized' }),
		});
		fetchMock.get(
			VIEWER_URL,
			{ status: 200, body: { data: { viewer: fullViewer(1, 'first') } } },
			{ delay: 300, repeat: 1 },
		);

		const { result } = renderHook(() => useAuth());

		await waitFor(() => {
			expect(result.current.isAuthenticated).toStrictEqual(false);
		});

		// The first user logs in, then is replaced before their viewer loads.
		act(() => {
			setAccessToken('first', Math.floor(Date.now() / 1000) + 300);
		});
		act(() => {
			setAccessToken(undefined, undefined);
		});
		fetchMock.get(
			VIEWER_URL,
			{ status: 200, body: { data: { viewer: fullViewer(2, 'second') } } },
			{ overwriteRoutes: false },
		);
		act(() => {
			setAccessToken('second', Math.floor(Date.now() / 1000) + 300);
		});

		await waitFor(() => {
			expect(result.current.viewer?.username).toStrictEqual('second');
		});
		// Let the first user's delayed response arrive.
		await new Promise((resolve) => {
			setTimeout(resolve, 400);
		});

		expect(result.current.viewer?.username).toStrictEqual('second');
	});

	it('ignores logins when skip is true', () => {
		const { result } = renderHook(() => useAuth({ skip: true }));

		act(() => {
			setAccessToken('at', Math.floor(Date.now() / 1000) + 300);
		});

		expect(result.current.isAuthenticated).toStrictEqual(null);
	});
});
