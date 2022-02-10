import { client } from 'client';
import Link from 'next/link';

export default function Page() {
  const { useAuth } = client.auth;
  const { isLoading, isAuthenticated } = useAuth({
    shouldRedirect: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        You are not authenticated!{' '}
        <Link
          href={`/login?redirect_uri=${encodeURI(
            `${window.location.origin}/`,
          )}`}>
          <a>Please login</a>
        </Link>
      </div>
    );
  }

  return (
    <div>
      You are authenticated!{' '}
      <Link href={`/logout`}>
        <a>Logout</a>
      </Link>
    </div>
  );
}
