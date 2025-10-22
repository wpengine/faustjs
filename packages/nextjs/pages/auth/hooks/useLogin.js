import { useState } from 'react';

const DEFAULT_LOGIN_URL = '/api/session/login';

function useLogin() {
	const [error, setError] = useState();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	async function login({
		loginUrl = DEFAULT_LOGIN_URL,
		input,
		onSuccess = () => {},
		onError = () => {},
	}) {
		if (!input) {
			// Input validation
			const errorData = {
				error: true,
				message: 'Input is required',
				details: 'No login credentials were provided',
			};
			setError(errorData);
			onError(errorData);
			return;
		}

		setIsLoading(true);
		setError(undefined);

		try {
			const res = await fetch(loginUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(input),
			});

			const responseData = await res.json();

			if (!res.ok) {
				// Transform API error to standard format if needed
				const errorData = responseData.error
					? responseData
					: {
							error: true,
							message: 'Login failed',
							details: responseData.message || JSON.stringify(responseData),
					  };

				setError(errorData);
				onError(errorData);
				setIsLoading(false);
				return;
			}

			setIsLoading(false);
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
			setIsLoading(false);
		}
	}

	return {
		login,
		isLoading,
		data,
		error,
	};
}

export { useLogin };
