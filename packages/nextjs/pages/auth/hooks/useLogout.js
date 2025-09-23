import { useState } from 'react';

const DEFAULT_LOGOUT_URL = '/api/session/logout';

export function useLogout() {
	const [error, setError] = useState();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	async function logout({
		logoutUrl = DEFAULT_LOGOUT_URL,
		onSuccess = () => {},
		onError = () => {},
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
				// Transform API error to standard format if needed
				const errorData = responseData.error
					? responseData
					: {
							error: true,
							message: 'Logout failed',
							details: responseData.message || JSON.stringify(responseData),
					  };

				setError(errorData);
				onError(errorData);
				return;
			}

			setData(responseData);
			onSuccess(responseData);
		} catch (err) {
			const errorData = {
				error: true,
				message: 'Network error or server unavailable',
				details:
					err instanceof Error ? err.message : 'An unknown error occurred',
			};
			setError(errorData);
			onError(errorData);
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
