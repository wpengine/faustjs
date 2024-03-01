import { useState } from 'react';
import {
  FAUST_API_BASE_PATH,
  LOGOUT_ENDPOINT_PARTIAL_PATH,
} from '../lib/constants.js';
import { getGlobalBasePath } from '../lib/getGlobalBasePath.js';

export function useLogout() {
  const [error, setError] = useState<Response | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function logout(redirectUrl?: string) {
    setLoading(true);
    const logoutUrl = `${getGlobalBasePath()}${FAUST_API_BASE_PATH}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`;

    // Clear the refresh token from the cookie.
    const res = await fetch(logoutUrl, {
      method: 'POST',
    });

    if (!res.ok) {
      setError(res);
      setLoading(false);

      return;
    }

    const isPreview = window.location.search.includes('preview=true');

    if (redirectUrl) {
      window.location.assign(redirectUrl);
    } else if (isPreview) {
      const publicUrlPath = process.env.NEXT_PUBLIC_URL;
      if (publicUrlPath) {
        window.location.assign(publicUrlPath);
      } else {
        window.location.reload();
      }
    } else {
      window.location.reload();
    }

    setLoading(false);
  }

  return {
    error,
    logout,
    loading,
  };
}
