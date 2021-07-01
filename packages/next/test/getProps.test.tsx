import { expect } from '@jest/globals';
import React from 'react';
import {
  mockedServerSidePropsContext,
  mockedStaticPropsContext,
} from '../jest.setup';
import { getNextStaticProps, getNextServerSideProps } from '../src';
import { CLIENT_CACHE_PROP } from '../src/getProps';

describe('getNextStaticProps', () => {
  let client = {
    setAsRoot: () => {},
    prepareReactRender: () => {},
  };
  const setAsRootSpy = jest
    .spyOn(client, 'setAsRoot')
    .mockImplementation(() => {});
  const prepareReactRenderSpy = jest
    .spyOn(client, 'prepareReactRender')
    .mockImplementation(() => {
      return {
        cacheSnapshot: 'cache',
      };
    });

  const MockPage = () => {
    return <p>My Page</p>;
  };

  test('getNextStaticProps with notFound should return notFound', async () => {
    const context = mockedStaticPropsContext;

    const staticProps = await getNextStaticProps(context, {
      // @ts-ignore
      client,
      Page: MockPage,
      notFound: true,
    });

    const expectedProps = {
      notFound: true,
    };

    expect(staticProps).toStrictEqual(expectedProps);
    expect(setAsRootSpy).toBeCalledTimes(0);
    expect(prepareReactRenderSpy).toBeCalledTimes(0);
  });

  test('getNextStaticProps with redirect should return the redirect object', async () => {
    const context = mockedStaticPropsContext;
    const redirect = {
      destination: '/',
      permanent: false,
    };

    const staticProps = await getNextStaticProps(context, {
      // @ts-ignore
      client,
      Page: MockPage,
      redirect,
    });

    expect(staticProps).toStrictEqual({ redirect });
    expect(setAsRootSpy).toBeCalledTimes(0);
    expect(prepareReactRenderSpy).toBeCalledTimes(0);
  });

  test('getNextStaticProps without page should not call prepareReactRender', async () => {
    const context = mockedStaticPropsContext;

    await getNextStaticProps(context, {
      // @ts-ignore
      client,
    });

    expect(prepareReactRenderSpy).toBeCalledTimes(0);
  });

  test('getNextStaticProps should return props with cache', async () => {
    const context = mockedStaticPropsContext;

    const staticProps = await getNextStaticProps(context, {
      // @ts-ignore
      client,
      Page: MockPage,
      props: {
        title: 'Hello World',
      },
    });

    const expectedProps = {
      props: {
        [CLIENT_CACHE_PROP]: 'cache',
        title: 'Hello World',
      },
      revalidate: 1,
    };

    expect(staticProps).toStrictEqual(expectedProps);
  });

  test('getNextStaticProps should allow for specifying revalidation', async () => {
    const context = mockedStaticPropsContext;

    const staticProps = await getNextStaticProps(context, {
      // @ts-ignore
      client,
      Page: MockPage,
      revalidate: 30,
    });

    const expectedProps = {
      props: {
        [CLIENT_CACHE_PROP]: 'cache',
      },
      revalidate: 30,
    };

    expect(staticProps).toStrictEqual(expectedProps);
  });
});

describe('getNextServerSideProps', () => {
  let client = {
    setAsRoot: () => {},
    prepareReactRender: () => {},
  };
  const setAsRootSpy = jest
    .spyOn(client, 'setAsRoot')
    .mockImplementation(() => {});
  const prepareReactRenderSpy = jest
    .spyOn(client, 'prepareReactRender')
    .mockImplementation(() => {
      return {
        cacheSnapshot: 'cache',
      };
    });

  const MockPage = () => {
    return <p>My Page</p>;
  };

  test('getNextServerSideProps with notFound should return notFound', async () => {
    const context = mockedServerSidePropsContext;

    const staticProps = await getNextServerSideProps(context, {
      // @ts-ignore
      client,
      Page: MockPage,
      notFound: true,
    });

    const expectedProps = {
      notFound: true,
    };

    expect(staticProps).toStrictEqual(expectedProps);
    expect(setAsRootSpy).toBeCalledTimes(0);
    expect(prepareReactRenderSpy).toBeCalledTimes(0);
  });

  test('getNextServerSideProps with redirect should return the redirect object', async () => {
    const context = mockedServerSidePropsContext;
    const redirect = {
      destination: '/',
      permanent: false,
    };

    const staticProps = await getNextServerSideProps(context, {
      // @ts-ignore
      client,
      Page: MockPage,
      redirect,
    });

    expect(staticProps).toStrictEqual({ redirect });
    expect(setAsRootSpy).toBeCalledTimes(0);
    expect(prepareReactRenderSpy).toBeCalledTimes(0);
  });

  test('getNextServerSideProps without page should not call prepareReactRender', async () => {
    const context = mockedServerSidePropsContext;

    await getNextServerSideProps(context, {
      // @ts-ignore
      client,
    });

    expect(prepareReactRenderSpy).toBeCalledTimes(0);
  });

  test('getNextServerSideProps should return props with cache', async () => {
    const context = mockedServerSidePropsContext;

    const staticProps = await getNextServerSideProps(context, {
      // @ts-ignore
      client,
      Page: MockPage,
      props: {
        title: 'Hello World',
      },
    });

    const expectedProps = {
      props: {
        [CLIENT_CACHE_PROP]: 'cache',
        title: 'Hello World',
      },
    };

    expect(staticProps).toStrictEqual(expectedProps);
  });
});
