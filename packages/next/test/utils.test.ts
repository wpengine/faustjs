import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { IncomingMessage, ServerResponse } from 'http';
import { isServerSidePropsContext, isStaticPropsContext } from '../src/utils';

/**
 * Next Server Side Props will always contain a req, res, query, and a resolvedUrl.
 * @link https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
const mockedServerSidePropsContext: GetServerSidePropsContext = {
  req: {} as IncomingMessage & {
    cookies: NextApiRequestCookies;
  },
  res: {} as ServerResponse,
  resolvedUrl: '/',
  query: {},
};

const mockedStaticPropsContext: GetStaticPropsContext = {
  params: { post: ['hello-world'] },
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined,
};

describe('isServerSidePropsContext util', () => {
  test('isServerSidePropsContext should return true with server side props context', () => {
    expect(isServerSidePropsContext(mockedServerSidePropsContext)).toBe(true);
  });

  test('isServerSidePropsContext should return false with static props context', () => {
    expect(isServerSidePropsContext(mockedStaticPropsContext)).toBe(false);
  });
});

describe('isStaticPropsContext util', () => {
  test('isStaticPropsContext should return true with static props context', () => {
    expect(isStaticPropsContext(mockedStaticPropsContext)).toBe(true);
  });

  test('isStaticPropsContext should return false with server side props context', () => {
    expect(isStaticPropsContext(mockedServerSidePropsContext)).toBe(false);
  });
});
