import { cookies } from 'next/headers.js';
import { getWpUrl } from '@faustwp/core/dist/mjs/lib/getWpUrl.js';

export async function onLogout() {
  'use server';

  const wpCookieName = `${getWpUrl()}-rt`;
  const cookieStore = cookies();
  const wpCookie = cookieStore.get(wpCookieName);

  if (wpCookie?.name) {
    cookieStore.delete(wpCookieName);
    return true;
  }
  return false;
}
