import { getWpUrl } from '@faustwp/core/dist/cjs/lib/getWpUrl.js';
import { cookies } from 'next/headers.js';

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
