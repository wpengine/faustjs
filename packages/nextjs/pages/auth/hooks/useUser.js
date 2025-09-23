import { useState, useEffect } from 'react';

const DEFAULT_ME_URL = '/api/session/me';

function useUser({ autoFetch = true } = {}) {
	const [error, setError] = useState();
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	async function fetchUser({
		meUrl = DEFAULT_ME_URL,
		onSuccess = () => {},
		onError = () => {},
	} = {}) {
		setIsLoading(true);
		setError(null);

		try {
			const res = await fetch(meUrl, {
				method: 'GET',
				credentials: 'include', // Include cookies for session
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
							message: 'Failed to fetch user data',
							details: responseData.message || JSON.stringify(responseData),
					  };

				setError(errorData);
				setIsAuthenticated(false);
				setData(null);
				onError(errorData);
				setIsLoading(false);
				return;
			}

			setIsAuthenticated(responseData.data?.isAuthenticated || false);
			setData(responseData.data?.user || null);
			onSuccess(responseData.data);
		} catch (err) {
			const errorData = {
				error: true,
				message: 'Network error or server unavailable',
				details: err.message,
			};
			setError(errorData);
			setIsAuthenticated(false);
			setData(null);
			onError(errorData);
		} finally {
			setIsLoading(false);
		}
	}

	// Auto-fetch user data on mount if enabled
	useEffect(() => {
		if (autoFetch) {
			fetchUser();
		}
	}, [autoFetch]);

	const refetch = () => fetchUser();

	return {
		fetchUser,
		refetch,
		isLoading,
		user: data,
		error,
		isAuthenticated,
	};
}

export { useUser };
