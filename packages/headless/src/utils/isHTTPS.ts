import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

/**
 * @todo Make this check more robust by utilizing headers or something passed in from context.
 *
 * @param host Current host
 * @param context Next.js Context from Data Fetcher
 */
export default function isHTTPS(
  host: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: GetStaticPropsContext | GetServerSidePropsContext,
): boolean {
  return !/localhost/.test(host);
}
