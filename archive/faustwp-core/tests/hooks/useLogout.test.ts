/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { useLogout } from '../../src/hooks/useLogout';
import { act } from 'react-dom/test-utils';

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
		fetchMock.post(`/api/faust/auth/logout`, {
			status: 205,
		});

		const { result, waitForNextUpdate } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(result.current.error).toStrictEqual(undefined);
		expect(fetchMock.called()).toBeTruthy();

		fetchMock.restore();
	});

	it('calls window.location.reload if no redirect url', async () => {
		fetchMock.post(`/api/faust/auth/logout`, {
			status: 205,
		});

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(window.location.reload).toBeCalled();

		fetchMock.restore();
	});

	it('calls window.location.assign to / if there is a preview url and no redirectUrl', async () => {
		fetchMock.post(`/api/faust/auth/logout`, {
			status: 205,
		});

		global.window.location.search = 'preview=true';

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(window.location.assign).toBeCalledWith('/');

		fetchMock.restore();
	});

	it('calls window.location.assign if there is a redirect url', async () => {
		fetchMock.post(`/api/faust/auth/logout`, {
			status: 205,
		});

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout('/'));

		expect(window.location.assign).toBeCalledWith('/');

		fetchMock.restore();
	});

	it('fails logout and provides the response object', async () => {
		fetchMock.post(`/api/faust/auth/logout`, {
			status: 500,
		});

		const { result } = renderHook(() => useLogout());

		await act(() => result.current.logout());

		expect(result.current.error).not.toBeUndefined();

		fetchMock.restore();
	});
});
