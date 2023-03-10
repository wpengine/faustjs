import { useState } from 'react';
import { LOGOUT_ENDPOINT_PARTIAL_PATH } from '../lib/constants.js';
import { getConfig } from '../config/index.js';

const { apiBasePath } = getConfig();

export function useLogout() {
  const [error, setError] = useState<Response | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function logout(redirectUrl?: string) {
    setLoading(true);

    const logoutUrl = `${apiBasePath}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`;

    // Clear the refresh token from the cookie.
    const res = await fetch(logoutUrl, {
      method: 'POST',
    });

    if (!res.ok) {
      setError(res);
      setLoading(false);

      return;
    }

    if (redirectUrl) {
      window.location.assign(redirectUrl);
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
