import { useAuth } from '@faustwp/core';

export function AuthenticatedView() {
  return (
    <>
      <h1>Front Page</h1>
      <p>My authenticated content.</p>
    </>
  );
}

export default function Page() {
  const { isAuthenticated, isReady, loginUrl } = useAuth();

  if (!isReady) {
    return <>Loading...</>;
  }

  console.log({ isAuthenticated, isReady, loginUrl });

  if (isAuthenticated === true) {
    return <AuthenticatedView />;
  }

  return (
    <>
      <p>Welcome!</p>
      <a href={loginUrl}>Login</a>
    </>
  );
}
