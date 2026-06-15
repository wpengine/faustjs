import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { fetchAccessToken } from '../auth/client/accessToken.js';
import { isValidEmail } from '../utils/index.js';

export const GENERATE_AUTHORIZATION_CODE = gql`
	mutation GenerateAuthorizationCode(
		$email: String
		$username: String
		$password: String!
	) {
		generateAuthorizationCode(
			input: { email: $email, username: $username, password: $password }
		) {
			code
			error
		}
	}
`;

export type GenerateAuthCodeMutationRes =
	| {
			generateAuthorizationCode: {
				code: string;
				error: null;
			};
	  }
	| {
			generateAuthorizationCode: {
				code: null;
				error: string;
			};
	  };

export function useLogin() {
	/**
	 * Use our own data state value here instead of the data value from
	 * the useMutation because we only want to return the data after the
	 * access token has been fetched, as this is truly when a user is "logged in"
	 */
	const [data, setData] = useState<
		GenerateAuthCodeMutationRes | null | undefined
	>(undefined);
	const [redirectUrlAfterLogin, setRedirectUrlAfterLogin] = useState<
		string | undefined
	>(undefined);
	const [loginMutation, { data: mutationData, loading, error }] =
		useMutation<GenerateAuthCodeMutationRes>(GENERATE_AUTHORIZATION_CODE);

	/**
	 * Callable function to login a user from your Faust frontend.
	 *
	 * @param usernameEmail The user's username or email
	 * @param password The user's password
	 * @param redirectUrl An optional URL to redirect to after successful login.
	 */
	function login(
		usernameEmail: string,
		password: string,
		redirectUrl?: string,
	) {
		// Clear states if there was a previous login attempt.
		setData(undefined);
		setRedirectUrlAfterLogin(redirectUrl);

		const mutationArgs: {
			username?: string;
			email?: string;
			password: string;
		} = { password };

		if (isValidEmail(usernameEmail)) {
			mutationArgs.email = usernameEmail;
		} else {
			mutationArgs.username = usernameEmail;
		}

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		loginMutation({ variables: mutationArgs });
	}

	// Handle after mutation has recieved data
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		(async () => {
			if (!mutationData) {
				return;
			}

			if (mutationData.generateAuthorizationCode.error !== null) {
				setData(mutationData);
				return;
			}

			// Fetch our access token with our authorization code
			await fetchAccessToken(mutationData.generateAuthorizationCode.code);

			// User has been successfully logged in.
			setData(mutationData);

			if (redirectUrlAfterLogin) {
				window.location.assign(redirectUrlAfterLogin);
			}
		})();
	}, [mutationData, redirectUrlAfterLogin]);

	return {
		login,
		loading,
		data,
		error,
	};
}
