/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { useLogout } from '../../src/hooks/useLogout';
import { act } from 'react';

describe('useLogout hook', () => {
	const windowBackup = window.location;

	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: jest.fn(), assign: jest.fn() },
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: windowBackup,
		});
	});

	it('has the proper initial state', async () => {
		const { result, waitForNextUpdate } = renderHook(() => useLogout());

		expect(result.current.error).toStrictEqual(undefined);
		expect(result.current.loading).toStrictEqual(false);
	});

	it('calls the logout endpoint to clear the refresh token', async () => {
		fetchMock.post('begin:/api/faust/auth/logout', {
			status: 205,
		});

		const { result, waitForNextUpdate } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(result.current.error).toStrictEqual(undefined);
		expect(fetchMock.called()).toBeTruthy();

		fetchMock.restore();
	});

	it('calls window.location.reload if no redirect url', async () => {
		fetchMock.post('begin:/api/faust/auth/logout', {
			status: 205,
		});

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(window.location.reload).toBeCalled();

		fetchMock.restore();
	});

	it('calls window.location.assign to / if there is a preview url and no redirectUrl', async () => {
		fetchMock.post('begin:/api/faust/auth/logout', {
			status: 205,
		});

		global.window.location.search = 'preview=true';

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(window.location.assign).toBeCalledWith('/');

		fetchMock.restore();
	});

	it('calls window.location.assign if there is a redirect url', async () => {
		fetchMock.post('begin:/api/faust/auth/logout', {
			status: 205,
		});

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout('/'));

		expect(window.location.assign).toBeCalledWith('/');

		fetchMock.restore();
	});

	it('fails logout and provides the response object', async () => {
		fetchMock.post('begin:/api/faust/auth/logout', {
			status: 500,
		});

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(result.current.error).not.toBeUndefined();

		fetchMock.restore();
	});

	it('sends the destination to the logout endpoint', async () => {
		fetchMock.post('begin:/api/faust/auth/logout', { status: 205 });

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout('https://frontend.local/bye'));

		expect(fetchMock.lastUrl()).toBe(
			'/api/faust/auth/logout?redirect_uri=https%3A%2F%2Ffrontend.local%2Fbye',
		);

		fetchMock.restore();
	});

	it('sends the browser to the WordPress logout url when there is one', async () => {
		fetchMock.post('begin:/api/faust/auth/logout', {
			status: 200,
			body: { wordpressLogoutUrl: 'http://wp.local/?faust_logout=code' },
		});

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout('https://frontend.local/bye'));

		expect(window.location.assign).toHaveBeenLastCalledWith(
			'http://wp.local/?faust_logout=code',
		);

		fetchMock.restore();
	});
});
