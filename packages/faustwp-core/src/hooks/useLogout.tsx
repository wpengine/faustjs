import { useState } from 'react';
import {
	FAUST_API_BASE_PATH,
	LOGOUT_ENDPOINT_PARTIAL_PATH,
} from '../lib/constants.js';
import { getGlobalBasePath } from '../lib/getGlobalBasePath.js';

/**
 * Resolve a URL against the current page, so WordPress can redirect back to it.
 */
function toAbsoluteUrl(url: string): string {
	try {
		return new URL(url, window.location.href).href;
	} catch {
		return url;
	}
}

export function useLogout() {
	const [error, setError] = useState<Response | undefined>(undefined);
	const [loading, setLoading] = useState(false);

	async function logout(redirectUrl?: string) {
		setLoading(true);
		const isPreview = window?.location?.search?.includes('preview=true');
		const destination = redirectUrl ?? (isPreview ? '/' : window.location.href);
		const logoutUrl = `${getGlobalBasePath()}${FAUST_API_BASE_PATH}/${LOGOUT_ENDPOINT_PARTIAL_PATH}?redirect_uri=${encodeURIComponent(
			toAbsoluteUrl(destination),
		)}`;

		// Clear the refresh token from the cookie.
		const res = await fetch(logoutUrl, {
			method: 'POST',
		});

		if (!res.ok) {
			setError(res);
			setLoading(false);

			return;
		}

		// End the WordPress session too, which then redirects to the destination.
		const body = (
			res.status === 200 ? await res.json().catch(() => ({})) : {}
		) as { wordpressLogoutUrl?: string };

		if (body.wordpressLogoutUrl) {
			window.location.assign(body.wordpressLogoutUrl);
			setLoading(false);

			return;
		}

		if (redirectUrl) {
			window.location.assign(redirectUrl);
		} else if (isPreview) {
			window.location.assign('/');
		} else {
			window.location.reload();
		}

		setLoading(false);
	}

	return {
		error,
		logout,
		loading,
	};
}
