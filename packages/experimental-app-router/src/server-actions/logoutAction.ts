import { cookies } from 'next/headers.js';
import { getWpUrl } from '../faust-core-utils.js';

export async function onLogout() {
  'use server';

  const wpCookieName = `${getWpUrl()}-rt`;
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const cookieStore = await cookies();
  const wpCookie = cookieStore.get(wpCookieName);

  if (wpCookie?.name) {
    cookieStore.delete(wpCookieName);
    return true;
  }
  return false;
}
