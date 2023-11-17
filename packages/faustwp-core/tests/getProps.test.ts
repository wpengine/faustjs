import {
  ApolloCache,
  ApolloClient,
  gql,
  NormalizedCacheObject,
} from '@apollo/client';
import * as client from '../src/client';
import { getNextServerSideProps, getNextStaticProps } from '../src/getProps';

//@ts-ignore-next-line
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(),
  }),
);

beforeEach(() => {
  //@ts-ignore-next-line
  fetch.mockClear();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getProps', () => {
  describe('getNextStaticProps()', () => {
    test('getNextStaticProps() handles `notFound`', async () => {
      expect.assertions(1);
      expect(
        await getNextStaticProps({}, { Page: {}, notFound: true }),
      ).toStrictEqual({ notFound: true, revalidate: 900 });
    });

    test('getNextStaticProps() handles `redirect`', async () => {
      expect.assertions(1);
      expect(
        await getNextStaticProps(
          {},
          { Page: {}, redirect: { destination: '/', permanent: false } },
        ),
      ).toStrictEqual({ redirect: { destination: '/', permanent: false } });
    });

    test('getNextStaticProps() handles `revalidate`', async () => {
      expect.assertions(2);
      expect(
        await getNextStaticProps({}, { Page: {}, revalidate: 100 }),
      ).toStrictEqual({
        props: {
          __APOLLO_STATE__: {},
        },
        revalidate: 100,
      });

      expect(await getNextStaticProps({}, { Page: {} })).toStrictEqual({
        props: {
          __APOLLO_STATE__: {},
        },
        revalidate: 900,
      });
    });

    test('getNextStaticProps() returns page data and variables as props', async () => {
      const mockApolloClient = {
        query: jest.fn().mockReturnValue({
          data: { generalSettings: { title: 'My test site' } },
        }),
        cache: {
          extract: jest.fn().mockReturnValue({ testing: true }),
        },
      } as any as ApolloClient<NormalizedCacheObject>;

      const clientSpy = jest
        .spyOn(client, 'getApolloClient')
        .mockReturnValue(mockApolloClient);

      const Page = {
        query: gql`
          {
            generalSettings {
              title
            }
          }
        `,
        variables: (ctx: any, extra?: Record<string, unknown>) => ({
          testVar: true,
          extra
        }),
      };

      expect(
        await getNextStaticProps({}, { Page, extra: { custom: 'data' } }),
      ).toStrictEqual({
        props: {
          __APOLLO_STATE__: { testing: true },
          data: { generalSettings: { title: 'My test site' } },
          __PAGE_VARIABLES__: { testVar: true,  extra: { custom: 'data' } },
        },
        revalidate: 900,
      });
    });

    test('getNextServerSideProps() returns page data and variables as props', async () => {
      const mockApolloClient = {
        query: jest.fn().mockReturnValue({
          data: { generalSettings: { title: 'My test site' } },
        }),
        cache: {
          extract: jest.fn().mockReturnValue({ testing: true }),
        },
      } as any as ApolloClient<NormalizedCacheObject>;

      const clientSpy = jest
        .spyOn(client, 'getApolloClient')
        .mockReturnValue(mockApolloClient);

      const Page = {
        query: gql`
          {
            generalSettings {
              title
            }
          }
        `,
        variables: (ctx: any, extra?: Record<string, unknown>) => ({
          testVar: true,
          extra
        }),
      };

      expect(
        await getNextServerSideProps(
          {
            res: {
              setHeader() {},
              writeHead() {},
              end() {},
            },
          } as any,
          { Page, extra: { custom: 'data' } },
        ),
      ).toStrictEqual({
        props: {
          __APOLLO_STATE__: { testing: true },
          data: { generalSettings: { title: 'My test site' } },
          __PAGE_VARIABLES__: { testVar: true, extra: { custom: 'data' } },
        },
      });
    });
  });
});
