import { cookies } from 'next/headers.js';
import { getWpUrl } from '../faust-core-utils.js';

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
