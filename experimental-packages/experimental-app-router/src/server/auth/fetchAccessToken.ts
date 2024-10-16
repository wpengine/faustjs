import { fetchTokens } from './fetchTokens.js';

/**
 * Fetches an access token from the token endpoint. Uses fetchTokens under
 * the hood.
 *
 * @param code string|undefined An authorization code to get tokens.
 * @returns string|null
 */
export async function fetchAccessToken(code?: string) {
  const tokens = await fetchTokens(code);

  if (tokens === null) {
    return null;
  }

  return tokens.accessToken;
}
