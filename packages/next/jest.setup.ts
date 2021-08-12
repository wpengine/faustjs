import '@testing-library/jest-dom'; // For custom matchers. See https://github.com/testing-library/jest-dom#custom-matchers.

import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { IncomingMessage, ServerResponse } from 'http';

/**
 * Next Server Side Props will always contain a req, res, query, and a resolvedUrl.
 * @link https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export const mockedServerSidePropsContext: GetServerSidePropsContext = {
  req: {} as IncomingMessage & {
    cookies: NextApiRequestCookies;
  },
  res: {} as ServerResponse,
  resolvedUrl: '/',
  query: {},
};

export const mockedStaticPropsContext: GetStaticPropsContext = {
  params: {},
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined,
};
