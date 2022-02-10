import { client } from 'client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function Logout() {
  const router = useRouter();
  const { isLoggedOut, logout } = client.auth.useLogout();

  useEffect(() => {
    if (isLoggedOut !== undefined) {
      return;
    }

    // Initiate the logout process.
    // This could also be called on a button click, for example, in a nav menu.
    logout();
  }, [isLoggedOut, logout]);

  useEffect(() => {
    if (isLoggedOut) {
      // The user was successfully logged out. Redirect them.
      router.push('/');
    }
  }, [router, isLoggedOut]);

  return <>Logging out...</>;
}
