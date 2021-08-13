import { IncomingMessage, ServerResponse } from 'http';
import { isString } from 'lodash';
import isNil from 'lodash/isNil';
import Cookies from 'universal-cookie';
import { headlessConfig } from '../config';
import { base64Decode, base64Encode, getQueryParam } from '../utils';

export interface CookieOptions {
  request?: IncomingMessage;
  cookies?: string;
}

export function cookieKey(): string {
  const { wpUrl } = headlessConfig();

  return `${wpUrl}-rt`;
}

export function initializeCookies({
  request,
  cookies,
}: CookieOptions = {}): Cookies {
  if (!isNil(cookies)) {
    return new Cookies(cookies);
  }

  if (!isNil(request) && isString(request.headers.cookie)) {
    return new Cookies(request.headers.cookie);
  }

  return new Cookies();
}

export function getRefreshToken(options?: CookieOptions): string | undefined {
  const cookies = initializeCookies(options);
  const token: string = cookies.get(cookieKey());

  if (!token) {
    return;
  }

  return base64Decode(token);
}

export function storeRefreshToken(
  token: string | undefined,
  res: ServerResponse,
  options: CookieOptions,
): void {
  const COOKIE_KEY = cookieKey();
  const cookies = initializeCookies(options);
  if (!token) {
    cookies.remove(COOKIE_KEY);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_KEY}=; expires=${yesterday.toUTCString()}; path=/`,
    );

    return;
  }

  const encodedToken = base64Encode(token);

  cookies.set(COOKIE_KEY, encodedToken);
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_KEY}=${encodedToken}; Max-Age=2592000; path=/; SameSite=Strict; Secure; HttpOnly;`,
  );
}

export interface AuthorizeOptions {
  code?: string;
  refreshToken?: string;
}

export interface AuthorizeResponse {
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken: string;
  refreshTokenExpiration: number;
}

export async function authorize(
  options?: AuthorizeOptions,
): Promise<AuthorizeResponse> {
  const { code, refreshToken } = options || {};
  const { wpUrl, apiClientSecret } = headlessConfig();

  if (!isString(apiClientSecret)) {
    throw new Error(
      'You must provide an apiClientSecret value in your Headless config in order to use the authorize middleware',
    );
  }

  const response = await fetch(`${wpUrl}/wp-json/wpac/v1/authorize`, {
    headers: {
      'Content-Type': 'application/json',
      'x-wpe-headless-secret': apiClientSecret,
    },
    method: 'POST',
    body: JSON.stringify({
      code,
      refreshToken,
    }),
  });

  const result = (await response.json()) as AuthorizeResponse;

  if (!response.ok) {
    throw {
      error: result,
      status: response.status,
    };
  }

  return result;
}

let accessToken: string | undefined;

export function getAccessTokenNew(): string | undefined {
  return accessToken;
}

export function setAccessToken(token: string | undefined): void {
  accessToken = token;
}

export interface EnsureAuthorizationOptions {
  redirectUri?: string;
  loginPageUri?: string;
}

export async function fetchToken(code?: string): Promise<string | null> {
  let url = `http://localhost:3000/api/auth/wpe-headless`;

  if (isString(code) && code.length > 0) {
    url += `?code=${code}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = (await response.json()) as { accessToken: string };

  if (!response.ok) {
    return null;
  }

  setAccessToken(result.accessToken);

  return result.accessToken;
}

export async function ensureAuthorizationNew(
  options?: EnsureAuthorizationOptions,
): Promise<true | { redirect?: string; login?: string }> {
  const { wpUrl } = headlessConfig();
  const { redirectUri, loginPageUri } = options || {};

  const code: string | undefined =
    typeof window !== 'undefined'
      ? getQueryParam(window.location.href, 'code')
      : undefined;

  const unauthorized: { redirect?: string; login?: string } = {};

  if (isString(redirectUri)) {
    unauthorized.redirect = `${wpUrl}/generate?redirect_uri=${encodeURIComponent(
      redirectUri,
    )}`;
  }

  if (isString(loginPageUri)) {
    unauthorized.login = loginPageUri;
  }

  const token = await fetchToken(code);

  if (!token) {
    return unauthorized;
  }

  return true;
}

export async function authorizeHandlerNew(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = req.url as string;
  const code = getQueryParam(url, 'code');
  const currentRefreshToken = getRefreshToken({ request: req });

  if (!currentRefreshToken && !code) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));

    return;
  }

  const { wpUrl, apiClientSecret } = headlessConfig();

  if (!apiClientSecret) {
    throw new Error('secret must be defined');
  }

  const response = await fetch(`${wpUrl}/wp-json/wpac/v1/authorize`, {
    headers: {
      'Content-Type': 'application/json',
      'x-wpe-headless-secret': apiClientSecret,
    },
    method: 'POST',
    body: JSON.stringify({
      code,
      refreshToken: currentRefreshToken,
    }),
  });

  const result = (await response.json()) as AuthorizeResponse;

  if (!response.ok) {
    res.statusCode = 401;
    res.end(JSON.stringify(result));

    return;
  }

  storeRefreshToken(result.refreshToken, res, { request: req });

  res.statusCode = 200;
  res.end(JSON.stringify(result));

  return;
}

// export function redirectAuthorizeHandler(
//   req: IncomingMessage,
//   res: ServerResponse,
// ): void {
//   const { wpUrl } = headlessConfig();
//   const url = req.url as string;
//   const code = getQueryParam(url, 'code');
//   const refreshToken = getRefreshToken({ request: req });

//   if (!refreshToken && !code) {
//     res.statusCode = 401;
//     res.end(JSON.stringify({ error: 'Unauthorized' }));

//     return;
//   }

//   // const authResult = redirect(
//   //   res,
//   //   `${wpUrl}/generate?redirect_uri=http://localhost:3000`,
//   // );
// }

// export async function authorizeHandlerNew(
//   req: IncomingMessage,
//   res: ServerResponse,
// ): Promise<void> {
//   const { authType } = headlessConfig();

//   if (authType === 'local') {
//     return localAuthorizeHandler(req, res);
//   } else {
//     return redirectAuthorizeHandler(req, res);
//   }
// }
