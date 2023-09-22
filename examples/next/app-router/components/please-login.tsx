import Link from 'next/link';

export function PleaseLogin() {
  return (
    <>
      You must be authenticated! Please <Link href={`/login`}>log in</Link>{' '}
      first.
    </>
  );
}
