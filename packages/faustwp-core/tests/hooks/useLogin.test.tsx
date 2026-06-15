/**
 * @jest-environment jsdom
 */

import React, { PropsWithChildren } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import fetchMock from 'fetch-mock';
import { useLogin } from '../../src/hooks/useLogin';
import { FaustProvider } from '../../src/components/FaustProvider';

xdescribe('useLogin hook', () => {
	const windowBackup = window.location;

	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { assign: jest.fn() },
		});
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: windowBackup,
		});
	});

	const wrapper = ({ children }: PropsWithChildren<{}>) => (
		<FaustProvider pageProps={{}}>{children}</FaustProvider>
	);

	it('has the proper initial state', async () => {
		const { result } = renderHook(() => useLogin(), {
			wrapper,
		});

		expect(result.current.error).toStrictEqual(undefined);
		expect(result.current.loading).toStrictEqual(false);
		expect(result.current.data).toStrictEqual(undefined);
	});

	it('login() calls the mutation and returns a code on proper login', async () => {
		const { result } = renderHook(() => useLogin(), {
			wrapper,
		});

		fetchMock.post(`/index.php?graphql`, {
			status: 200,
			body: JSON.stringify({
				data: {
					generateAuthorizationCode: {
						error: null,
						code: 'auth-code',
					},
				},
			}),
		});

		fetchMock.get(`/api/faust/auth/token?code=auth-code`, {
			status: 200,
			body: JSON.stringify({
				accessToken: 'at',
				refreshToken: 'rf',
			}),
		});

		act(() => result.current.login('username', 'password'));

		await waitFor(() => {
			expect(result.current.data?.generateAuthorizationCode.code).toStrictEqual(
				'auth-code',
			);
		});

		fetchMock.restore();
	});

	it('login() with redirect url redirects after successful login', async () => {
		const { result } = renderHook(() => useLogin(), {
			wrapper,
		});

		fetchMock.post(`/index.php?graphql`, {
			status: 200,
			body: JSON.stringify({
				data: {
					generateAuthorizationCode: {
						error: null,
						code: 'auth-code',
					},
				},
			}),
		});

		fetchMock.get(`/api/faust/auth/token?code=auth-code`, {
			status: 200,
			body: JSON.stringify({
				accessToken: 'at',
				refreshToken: 'rf',
			}),
		});

		act(() => result.current.login('username', 'password', '/dashboard'));

		await waitFor(() => {
			expect(window.location.assign).toBeCalledWith('/dashboard');
		});

		fetchMock.restore();
	});

	it('login() calls the mutation and returns an error on invalid login', async () => {
		const { result } = renderHook(() => useLogin(), {
			wrapper,
		});

		fetchMock.post(`/index.php?graphql`, {
			status: 200,
			body: JSON.stringify({
				data: {
					generateAuthorizationCode: {
						error: 'Some error',
						code: null,
					},
				},
			}),
		});

		act(() => result.current.login('username', 'password'));

		await waitFor(() => {
			expect(
				result.current.data?.generateAuthorizationCode.error,
			).toStrictEqual('Some error');
		});

		fetchMock.restore();
	});
});
