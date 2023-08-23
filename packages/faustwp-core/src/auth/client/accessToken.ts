import isString from 'lodash/isString.js';
import {
  FAUST_API_BASE_PATH,
  TOKEN_ENDPOINT_PARTIAL_PATH,
} from '../../lib/constants.js';
import { getGlobalBasePath } from '../../lib/getGlobalBasePath.js';
import { isServerSide } from '../../utils/index.js';

export interface AccessToken {
  /**
   * Base 64 encoded access token
   */
  token: string | undefined;
  /**
   * The time in seconds until the access token expires.
   */
  expiration: number | undefined;
}

export type RefreshTimer = ReturnType<typeof setTimeout> | undefined;

/**
 * The amount of time in seconds until the access token is fetched
 * before it expires.
 *
 * For example, if the access token expires in 5 minutes (300 seconds), and
 * this value is 60, then the access token will be refreshed at 240 seconds.
 *
 * This allows for enough time to fetch a new access token before it expires.
 *
 */
export const TIME_UNTIL_REFRESH_BEFORE_TOKEN_EXPIRES = 60;

/**
 * The setTimeout instance that refreshes the access token.
 */
let REFRESH_TIMER: RefreshTimer;

export function getRefreshTimer(): RefreshTimer {
  return REFRESH_TIMER;
}

export function setRefreshTimer(timer: RefreshTimer): void {
  REFRESH_TIMER = timer;
}

/**
 * The access token object
 */
let accessToken: AccessToken | undefined;

/**
 * Get an access token from memory if one exists
 *
 * @returns {string | undefined}
 */
export function getAccessToken(): string | undefined {
  return accessToken?.token;
}

/**
 * Get an access token expiration from memory if one exists
 *
 * @returns {number | undefined}
 */
export function getAccessTokenExpiration(): number | undefined {
  return accessToken?.expiration;
}

/**
 * Set an access token and/or its expiration in memory
 *
 * @param {string} token
 * @param {number} expiration
 *
 * @returns {void}
 */
export function setAccessToken(
  token: string | undefined,
  expiration: number | undefined,
): void {
  if (isServerSide()) {
    return;
  }

  accessToken = {
    token,
    expiration,
  };
}

/**
 * Creates the access token refresh timer that will fetch a new access token
 * before the current one expires.
 *
 * @returns {void}
 */
export function setAccessTokenRefreshTimer(): void {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const accessTokenExpirationInSeconds = getAccessTokenExpiration();

  // If there is no access token/expiration, don't create a timer.
  if (accessTokenExpirationInSeconds === undefined) {
    return;
  }

  const secondsUntilExpiration =
    accessTokenExpirationInSeconds - currentTimeInSeconds;
  const secondsUntilRefresh =
    secondsUntilExpiration - TIME_UNTIL_REFRESH_BEFORE_TOKEN_EXPIRES;

  setRefreshTimer(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setTimeout(() => void fetchAccessToken(), secondsUntilRefresh * 1000),
  );
}

/**
 * Clears the current access token refresh timer if one exists.
 */
export function clearAccessTokenRefreshTimer(): void {
  const timer = getRefreshTimer();
  if (timer !== undefined) {
    clearTimeout(timer);
  }
}

/**
 * Fetch an access token from the authorizeHandler middleware
 *
 * @export
 * @param {string} code An authorization code to fetch an access token
 */
export async function fetchAccessToken(code?: string): Promise<string | null> {
  let url = `${getGlobalBasePath()}${FAUST_API_BASE_PATH}/${TOKEN_ENDPOINT_PARTIAL_PATH}`;

  // Add the code to the url if it exists
  if (isString(code) && code.length > 0) {
    url += `?code=${encodeURIComponent(code)}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = (await response.json()) as {
      accessToken: string;
      accessTokenExpiration: number;
    };

    // If the response is not ok, clear the access token
    if (!response.ok) {
      setAccessToken(undefined, undefined);
      return null;
    }

    setAccessToken(result.accessToken, result.accessTokenExpiration);

    // If there is an existing refresh timer, clear it.
    clearAccessTokenRefreshTimer();

    /**
     * Set a refresh timer to fetch a new access token before
     * the current one expires.
     */
    setAccessTokenRefreshTimer();

    return result.accessToken;
  } catch (error) {
    setAccessToken(undefined, undefined);

    return null;
  }
}
