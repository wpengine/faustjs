import { useEffect, useState } from 'react';
import { ensureAuthorization } from '../index.js';

export function useAuth() {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<
    | true
    | {
        redirect?: string | URL;
        login?: string | URL;
      }
    | null
  >(null);

  /**
   * Ensure we are authenticated.
   */
  useEffect(() => {
    void (async () => {
      const response = await ensureAuthorization({
        redirectUri: window.location.href,
      });

      console.log({ response });

      if ('string' === typeof response) {
        setAccessToken(response);
        setIsAuthenticated(true);
        return;
      }

      if ('redirect' in response) {
        window.location.replace(response.redirect || '');
      }
    })();
  }, [isAuthenticated]);

  return { isAuthenticated, accessToken };
}
