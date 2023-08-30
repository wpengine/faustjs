import { cookies } from 'next/headers.js';
import { getWpUrl } from '@faustwp/core/dist/cjs/lib/getWpUrl.js';

export async function onLogout() {
  'use server';

  const cookieStore = cookies();
  const wpCookie = cookieStore.get(`${getWpUrl()}-rt`);
  return wpCookie?.name ? cookieStore.delete(wpCookie?.name) : false;
}
