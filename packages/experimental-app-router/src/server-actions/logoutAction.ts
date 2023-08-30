import { cookies } from 'next/headers.js';
import { getWpUrl } from '@faustwp/core/dist/cjs/lib/getWpUrl.js';

export async function onLogout() {
  'use server';

  const wpCookieName = `${getWpUrl()}-rt`;
  const cookieStore = cookies();
  const wpCookieExists = cookieStore.has(wpCookieName);

  if (wpCookieExists) {
    cookieStore.delete(wpCookieName);
    return true;
  }
  return false;
}
