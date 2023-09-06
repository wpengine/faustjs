import { fetchTokens } from './fetchTokens.js';

export async function fetchAccessToken(code?: string) {
  const tokens = await fetchTokens(code);

  if (tokens === null) {
    return null;
  }

  return tokens.accessToken;
}
