import { fetchToken } from './authorize';

export interface AccessToken {
  token: string | undefined;
  expiration: number | undefined;
}

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
  accessToken = {
    token,
    expiration,
  };
}

/**
 * The interval in which the access token is check if a new one
 * needs to be fetched
 */
export const ACCESS_TOKEN_EXP_CHECK_INTERVAL = 15000;

/**
 * The difference in seconds between the current time and the expiration
 * which the access token should be re-fetched
 */
export const TIME_DIFF_TO_FETCH_TOKEN = 60;

/**
 * Continuously check if the access token is close to
 * expiration and fetch a new one if needed.
 */
setInterval(() => {
  if (!accessToken?.token || !accessToken?.expiration) {
    return;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  // Only refetch the token if it's 60 seconds before its expiration
  if (currentTime + TIME_DIFF_TO_FETCH_TOKEN < accessToken.expiration) {
    return;
  }

  void fetchToken();
}, ACCESS_TOKEN_EXP_CHECK_INTERVAL);
