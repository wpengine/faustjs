import { useState } from 'react';

const DEFAULT_LOGOUT_URL = '/api/session/logout';

export function useLogout() {
	const [error, setError] = useState();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	async function logout({
		logoutUrl = DEFAULT_LOGOUT_URL,
		onSuccess = () => {},
	} = {}) {
		setIsLoading(true);
		setError(undefined);

		try {
			const res = await fetch(logoutUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const responseData = await res.json();

			if (!res.ok) {
				setError(responseData);
				return;
			}

			setData(responseData);
			onSuccess(responseData);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred',
			);
		} finally {
			setIsLoading(false);
		}
	}

	return {
		logout,
		isLoading,
		data,
		error,
	};
}
