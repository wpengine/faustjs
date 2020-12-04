import { ServerResponse } from 'http';
import Cookies from 'universal-cookie';
import { base64Decode, base64Encode } from '../utils';

let cookies = new Cookies();
const WP_URL =
process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL;
const TOKEN_KEY = `${WP_URL}-at`;

export function initializeServerCookie(cookie: string | undefined) {
    cookies = new Cookies(cookie);
}

export function getAccessToken() {
    const token: string = cookies.get(TOKEN_KEY);

    if (!token) {
        return;
    }

    return base64Decode(token);
}

export function storeAccessToken(token: string | undefined, res: ServerResponse) {
    if (!token) {
        cookies.remove(TOKEN_KEY);

        return;
    }

    const encodedToken = base64Encode(token);

    cookies.set(TOKEN_KEY, encodedToken);
    res.setHeader('Set-Cookie', `${TOKEN_KEY}=${encodedToken}; Max-Age=2592000; SameSite=Strict`);
}
