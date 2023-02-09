import { getNextStaticProps } from '../src/getProps';

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

describe('getProps', () => {
  describe('getNextStaticProps()', () => {
    test('getNextStaticProps() handles `notFound`', async () => {
      expect.assertions(1);
      expect(
        await getNextStaticProps({}, { Page: {}, notFound: true }),
      ).toStrictEqual({ notFound: true });
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
  });
});
