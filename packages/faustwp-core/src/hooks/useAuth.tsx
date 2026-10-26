import trim from 'lodash/trim.js';
import defaults from 'lodash/defaults.js';
import { useEffect, useRef, useState } from 'react';
import { gql } from '@apollo/client';
import {
	ensureAuthorization,
	EnsureAuthorizationOptions,
	getAccessToken,
	onAuthChange,
} from '../auth/index.js';
import { getApolloAuthClient } from '../client.js';
import { getWpUrl } from '../lib/getWpUrl.js';

type RedirectStrategyConfig = {
	strategy: 'redirect';
	shouldRedirect?: boolean;
	skip?: boolean;
};

type LocalStrategyConfig = {
	strategy: 'local';
	loginPageUrl: string;
	shouldRedirect?: boolean;
	skip?: boolean;
};

type ViewerType = {
	name?: string;
	username?: string;
	capabilities?: string[];
	databaseId?: number;
	description?: string;
	email?: string;
	firstName?: string;
	id?: number;
	lastName?: string;
	nickname?: string;
	locale?: string;
	registeredDate?: string;
	slug?: string;
	templates?: string[];
	uri?: string;
	url?: string;
	userId?: number;
	avatar?: {
		url?: string;
	};
};

export type UseAuthConfig = RedirectStrategyConfig | LocalStrategyConfig;

/**
 * The URL to log in at for the given strategy, returning to the current page.
 */
function getLoginUrl(config: UseAuthConfig): string {
	const redirectUri = encodeURIComponent(window.location.href);

	return config.strategy === 'local'
		? `/${trim(config.loginPageUrl, '/')}?redirect_uri=${redirectUri}`
		: `${getWpUrl()}/generate?redirect_uri=${redirectUri}`;
}

export function useAuth(_config?: UseAuthConfig) {
	const config = defaults(_config, {
		strategy: 'redirect',
		shouldRedirect: false,
		skip: false,
	}) as UseAuthConfig;

	if (config.strategy === 'local' && !config.loginPageUrl) {
		throw new Error(
			'useAuth: Local strategies must specify the "loginPageUrl"',
		);
	}

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [isReady, setIsReady] = useState<boolean>(false);
	const [loginUrl, setLoginUrl] = useState<string | null>(null);
	const [called, setCalled] = useState<boolean>(false);
	const [viewer, setViewer] = useState<ViewerType | null>(null);
	// Counts logins and logouts in this tab, so a viewer request started before
	// one is ignored.
	const [session, setSession] = useState<number>(0);
	const sessionRef = useRef<number>(0);
	const initialCheckDone = useRef<boolean>(false);
	const configRef = useRef<UseAuthConfig>(config);
	configRef.current = config;

	useEffect(() => {
		if (config.skip === true) {
			return;
		}

		if (called) {
			return;
		}

		setCalled(true);

		const ensureAuthorizationConfig: EnsureAuthorizationOptions = {
			redirectUri: window.location.href,
		};

		if (config.strategy === 'local') {
			ensureAuthorizationConfig.loginPageUri = `/${trim(
				config.loginPageUrl,
				'/',
			)}?redirect_uri=${encodeURIComponent(window.location.href)}`;
		}

		/* eslint-disable @typescript-eslint/no-floating-promises */
		(async () => {
			const authResult = await ensureAuthorization(ensureAuthorizationConfig);

			setIsAuthenticated(authResult === true);

			if (
				authResult !== true &&
				authResult?.login &&
				config.strategy === 'local'
			) {
				setLoginUrl(authResult.login);
			}

			if (
				authResult !== true &&
				authResult?.redirect &&
				config.strategy === 'redirect'
			) {
				setLoginUrl(authResult.redirect);
			}

			setIsReady(true);
			initialCheckDone.current = true;
		})();
	}, [called, config]);

	/**
	 * Update when this tab logs in or out after the first check, for example
	 * after a login with useLogin() or when the session ends.
	 */
	useEffect(() => {
		if (config.skip === true) {
			return undefined;
		}

		function syncWithAccessToken() {
			const authenticated = Boolean(getAccessToken());

			sessionRef.current += 1;
			setSession(sessionRef.current);
			setIsAuthenticated(authenticated);
			setIsReady(true);
			setViewer(null);
			setLoginUrl(authenticated ? null : getLoginUrl(configRef.current));
		}

		// The user may have logged in or out while skip was true.
		if (initialCheckDone.current) {
			syncWithAccessToken();
		}

		return onAuthChange(syncWithAccessToken);
	}, [config.skip]);

	/**
	 * Automatically redirect the user to the login page if the
	 * shouldRedirect option is set to true.
	 */
	useEffect(() => {
		if (config.skip === true) {
			return;
		}

		if (
			!config.shouldRedirect ||
			!isReady ||
			isAuthenticated !== false ||
			!loginUrl
		) {
			return;
		}

		/**
		 * Using a setTimeout here because the page transition
		 * is a little too fast and makes for bad UX.
		 */
		setTimeout(() => {
			window.location.assign(loginUrl);
		}, 200);
	}, [isReady, isAuthenticated, loginUrl, config]);

	/**
	 * Expose viewer options to the toolbar if the user is authenticated.
	 */
	useEffect(() => {
		if (config.skip === true) {
			return;
		}

		if (isAuthenticated !== true) {
			return;
		}

		const requestSession = sessionRef.current;

		(async () => {
			const client = getApolloAuthClient();

			const { data } = await client.query<{ viewer?: ViewerType | null }>({
				// Always ask WordPress, and never share a request with an earlier
				// session's, since a different user may have logged in since.
				fetchPolicy: 'network-only',
				context: { queryDeduplication: false },
				query: gql`
					query GetFaustViewer {
						viewer {
							name
							username
							capabilities
							databaseId
							description
							email
							firstName
							id
							lastName
							nickname
							locale
							registeredDate
							slug
							templates
							uri
							url
							userId
							avatar {
								url
							}
						}
					}
				`,
			});
			// Ignore the result if the user logged in or out while it was loading.
			if (sessionRef.current === requestSession) {
				setViewer(data?.viewer ?? null);
			}
		})();
	}, [isAuthenticated, session, config.skip]);

	return {
		isAuthenticated,
		isReady,
		loginUrl,
		viewer,
	};
}
