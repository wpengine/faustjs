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
	}) {
		if (!input) {
			// TODO further input validation

			// TODO consistent error format
			setError(['Input is required']);
			return;
		}

		setIsLoading(true);

		// TODO add try catch
		const res = await fetch(loginUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});

		const data = await res.json();

		if (!res.ok) {
			setError(data);
			setIsLoading(false);
			return;
		}

		setIsLoading(false);
		setData(data); // TODO get data shape same as Faust
		onSuccess(data);
	}

	return {
		login,
		isLoading,
		data,
		error,
	};
}

export { useLogin };
