import { config, TOKEN_ENDPOINT_PARTIAL_PATH } from '../../config/index.js';
import { isServerSide } from '../../utils/index.js';
import isNil from 'lodash/isNil.js';
import isString from 'lodash/isString.js';

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
  if (isServerSide()) {
    return;
  }

  accessToken = {
    token,
    expiration,
  };
}

/**
 * Fetch an access token from the authorizeHandler middleware
 *
 * @export
 * @param {string} code An authorization code to fetch an access token
 */
export async function fetchAccessToken(code?: string): Promise<string | null> {
  const { apiBasePath } = config();

  if (isNil(apiBasePath)) {
    throw new Error(
      'You must provide an apiBasePath value in your Faust.js config in order to use the fetchToken middleware',
    );
  }

  let url = `${apiBasePath}/${TOKEN_ENDPOINT_PARTIAL_PATH}`;

  // Add the code to the url if it exists
  if (isString(code) && code.length > 0) {
    url += `?code=${code}`;
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

    return result.accessToken;
  } catch (error) {
    setAccessToken(undefined, undefined);

    return null;
  }
}

/**
 * The interval (in ms) in which the access token is check if a new one
 * needs to be fetched
 */
export const ACCESS_TOKEN_EXP_CHECK_INTERVAL_MS = 15000;

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

  void fetchAccessToken();
}, ACCESS_TOKEN_EXP_CHECK_INTERVAL_MS);
