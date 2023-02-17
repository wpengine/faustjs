import { useState } from 'react';
import {
  FAUST_API_BASE_PATH,
  LOGOUT_ENDPOINT_PARTIAL_PATH,
} from '../lib/constants.js';

export function useLogout() {
  const [error, setError] = useState<Response | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function logout(redirectUrl?: string) {
    setLoading(true);

    const logoutUrl = `${FAUST_API_BASE_PATH}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`;

    const res = await fetch(logoutUrl, {
      method: 'POST',
    });

    setLoading(false);

    if (!res.ok) {
      setError(res);

      return;
    }

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      window.location.reload();
    }
  }

  return {
    error,
    logout,
    loading,
  };
}
