import { useLogin } from '@faustjs/nextjs/pages';
import { useState } from 'react';

export default function Login({ closeModal = () => {} }) {
	const [usernameEmail, setUsernameEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login, isLoading, error } = useLogin();

	const submitForm = (e) => {
		e.preventDefault();

		login({
			input: {
				credentials: {
					password,
					username: usernameEmail,
				},
			},
			onSuccess: closeModal,
		});
	};

	return (
		<form onSubmit={submitForm} className="space-y-4">
			<div>
				<input
					type="text"
					name="username"
					placeholder="Username or Email"
					value={usernameEmail}
					onChange={(e) => setUsernameEmail(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required
				/>
			</div>
			<div>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					required
				/>
			</div>
			{error && (
				<div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-2">
					{error.message || 'Login failed. Please try again.'}
				</div>
			)}
			<button
				type="submit"
				disabled={isLoading}
				className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
				{isLoading ? 'Signing in...' : 'Sign In'}
			</button>
		</form>
	);
}
