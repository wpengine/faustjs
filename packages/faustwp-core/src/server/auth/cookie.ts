import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import isString from 'lodash/isString.js';
import { parseCookie, stringifySetCookie, SerializeOptions } from 'cookie';
import { base64Decode, base64Encode } from '../../utils/index.js';

export interface CookieOptions {
	encoded?: boolean;
	isJson?: boolean;
}

const LOOPBACK_HOST = /^(localhost|.+\.localhost|127(\.\d{1,3}){3}|\[::1\])$/i;

function firstHeaderValue(value?: string | string[]): string {
	const header = Array.isArray(value) ? value[0] : value;

	return (header ?? '').split(',')[0].trim().toLowerCase();
}

/**
 * Whether cookies set in response to this request should use the Secure
 * attribute.
 *
 * Secure is only left off for plain HTTP requests to a loopback host, such as
 * http://localhost during development. Safari discards Secure cookies there,
 * unlike other browsers, which loses the login session right after logging in.
 * See https://bugs.webkit.org/show_bug.cgi?id=218980. Remove this exception
 * once supported versions of Safari treat loopback hosts as secure.
 */
export function isSecureCookieRequest(req: IncomingMessage): boolean {
	const forwardedProto = firstHeaderValue(req.headers?.['x-forwarded-proto']);
	const encrypted = (req.socket as { encrypted?: boolean } | undefined)
		?.encrypted;
	const protocol = forwardedProto || (encrypted ? 'https' : 'http');
	const host = (
		firstHeaderValue(req.headers?.['x-forwarded-host']) ||
		firstHeaderValue(req.headers?.host)
	).replace(/:\d+$/, '');

	return !(protocol === 'http' && LOOPBACK_HOST.test(host));
}

export class Cookies {
	private request: IncomingMessage;

	private response?: ServerResponse;

	private cookies: Record<string, string | undefined> = {};

	/**
	 * Whether cookies for this request should use the Secure attribute. See
	 * `isSecureCookieRequest`.
	 */
	public readonly secure: boolean;

	constructor(req: IncomingMessage, res?: ServerResponse) {
		this.request = req;
		this.response = res;
		this.secure = isSecureCookieRequest(req);

		this.cookies = parseCookie(this.request.headers.cookie || '');
	}

	public getCookie(
		key: string,
		options: CookieOptions & { isJson: true },
	): any | undefined;
	public getCookie(key: string, options?: CookieOptions): string | undefined;
	public getCookie(
		key: string,
		{ encoded = true, isJson = false }: CookieOptions = {},
	): string | any | undefined {
		const value = this.cookies[key];

		if (!isString(value)) {
			return;
		}

		const valueStr = encoded ? base64Decode(value) : value;

		// eslint-disable-next-line consistent-return
		return isJson ? JSON.parse(valueStr) : valueStr;
	}

	public setCookie(
		key: string,
		value: string | Record<string, unknown>,
		{
			encoded = true,
			isJson = false,
			...serializeOptions
		}: CookieOptions & SerializeOptions = {},
	): void {
		const valueStr = isJson ? JSON.stringify(value) : (value as string);
		const cookieValue = encoded ? base64Encode(valueStr) : valueStr;

		this.cookies[key] = cookieValue;

		this.response?.setHeader(
			'Set-Cookie',
			stringifySetCookie(key, cookieValue, serializeOptions),
		);
	}

	public removeCookie(key: string): void {
		delete this.cookies[key];

		this.response?.setHeader(
			'Set-Cookie',
			stringifySetCookie(key, '', {
				path: '/',
				sameSite: 'strict',
				secure: this.secure,
				httpOnly: true,
				expires: new Date(0),
			}),
		);
	}
}
