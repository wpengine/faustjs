import 'isomorphic-fetch';
import isNil from 'lodash/isNil.js';
import isString from 'lodash/isString.js';
import isNumber from 'lodash/isNumber.js';
import { Cookies } from './cookie.js';
import { warnLog } from '../../utils/index.js';
import { getWpSecret } from '../../lib/getWpSecret.js';
import { getWpApplicationPasswordAuthorization } from '../../lib/getWpApplicationPassword.js';
import { getWpUrl } from '../../lib/getWpUrl.js';

export type OAuthTokenResponse =
	| OAuthTokens
	| { error: boolean; response: Response; result: any };

export interface OAuthTokens {
	accessToken: string;
	accessTokenExpiration: number;
	refreshToken: string;
	refreshTokenExpiration: number;
}

export class OAuth {
	private cookies: Cookies;

	private tokenKey: string;

	constructor(cookies: Cookies) {
		this.cookies = cookies;
		this.tokenKey = `${getWpUrl().replace(
			/[^!#$%&'*+\-.^_`|~0-9A-Za-z]/g,
			'',
		)}-rt`; // Sanitize URL to make cookie key RFC 6265 sec 4.1.1 compliant.
	}

	public getRefreshToken(): string | undefined {
		return this.cookies.getCookie(this.tokenKey);
	}

	public setRefreshToken(token?: string, expires?: number): void {
		if (!isString(token) || token.length === 0) {
			this.cookies.removeCookie(this.tokenKey);

			return;
		}

		let maxAge: number | undefined = 2592000;
		let expiresIn: Date | undefined;

		if (isNumber(expires)) {
			expiresIn = new Date(expires * 1000);
			maxAge = undefined;
		}

		this.cookies.setCookie(this.tokenKey, token, {
			expires: expiresIn,
			maxAge,
			path: '/',
			sameSite: 'strict',
			secure: true,
			httpOnly: true,
		});
	}

	public async fetch(code?: string): Promise<OAuthTokenResponse> {
		const wpUrl = getWpUrl();
		const apiClientSecret = getWpSecret();
		const applicationPassword = getWpApplicationPasswordAuthorization();

		if (!apiClientSecret && !applicationPassword) {
			throw new Error(
				'The apiClientSecret must be specified to use the auth middleware',
			);
		}

		// An Application Password, when configured, is used instead of the secret key.
		const authHeaders: Record<string, string> = applicationPassword
			? { Authorization: applicationPassword }
			: { 'x-faustwp-secret': apiClientSecret as string };

		let response = await fetch(`${wpUrl}/?rest_route=/faustwp/v1/authorize`, {
			headers: {
				'Content-Type': 'application/json',
				...authHeaders,
			},
			method: 'POST',
			body: JSON.stringify({
				code,
				refreshToken: this.getRefreshToken(),
			}),
		});

		if (response.status === 404 && apiClientSecret) {
			// Check for the deprecated authorize endpoint, which only accepts the secret key.
			response = await fetch(`${wpUrl}/?rest_route=/wpac/v1/authorize`, {
				headers: {
					'Content-Type': 'application/json',
					'x-wpe-headless-secret': apiClientSecret,
				},
				method: 'POST',
				body: JSON.stringify({
					code,
					refreshToken: this.getRefreshToken(),
				}),
			});

			if (response.status !== 404) {
				warnLog(
					'Authentication and post previews will soon be incompatible with ' +
						'your version of the FaustWP plugin. Please update to the latest' +
						' version.',
				);
			}
		}

		const result = await response.json();

		if (!response.ok) {
			return {
				error: true,
				response,
				result,
			};
		}

		return result as OAuthTokens;
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, class-methods-use-this
	public isOAuthTokens(value: any): value is OAuthTokens {
		const castedValue: OAuthTokens = value;

		return (
			!isNil(castedValue) &&
			isString(castedValue.accessToken) &&
			isString(castedValue.refreshToken) &&
			isNumber(castedValue.accessTokenExpiration) &&
			isNumber(castedValue.refreshTokenExpiration)
		);
	}
}
