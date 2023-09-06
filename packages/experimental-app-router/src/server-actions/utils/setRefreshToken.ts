import { getWpUrl } from '@faustwp/core/dist/cjs/lib/getWpUrl.js';
import { cookies } from 'next/headers.js';

/**
 * Sets the refresh token to the proper cookie. This can only be used within
 * server actions and server routes.
 *
 * @param refreshToken The refresh token from the token endpoint
 * @param refreshTokenExpiration The refresh token expiration from the token endpoint
 */
export async function setRefreshToken(
  refreshToken: string,
  refreshTokenExpiration: number,
) {
  const cookieStore = cookies();
  const cookieName = `${getWpUrl()}-rt`;

  cookieStore.set(cookieName, refreshToken, {
    secure: true,
    httpOnly: true,
    path: '/',
    expires: new Date(refreshTokenExpiration),
    sameSite: 'strict',
  });
}
