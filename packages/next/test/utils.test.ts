import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';
import { IncomingMessage, ServerResponse } from 'http';
import {
  getUrlFromContext,
  isCategoryParams,
  isPageParams,
  isPostParams,
  isPreviewParams,
  isServerSidePropsContext,
  isStaticPropsContext,
} from '../src/utils';

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

describe('isPostParams', () => {
  // /posts/hello-world
  test('isPostParams should return true with post param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        post: 'hello-world',
      },
    };

    expect(isPostParams(context)).toBe(true);
  });

  test('isPostParams should return false with no post param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {},
    };

    expect(isPostParams(context)).toBe(false);
  });

  test('isPostParams should throw an error if post param is a string array', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        post: ['hello-world'],
      },
    };

    expect(() => isPostParams(context)).toThrow();
  });
});

describe('isPageParams', () => {
  // /sample-page
  test('isPageParams should return true with page param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        page: 'sample-page',
      },
    };

    expect(isPageParams(context)).toBe(true);
  });

  test('isPageParams should return false with no page param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {},
    };

    expect(isPageParams(context)).toBe(false);
  });

  test('isPageParams should throw an error if page param is a string array', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        page: ['sample-page'],
      },
    };

    expect(() => isPageParams(context)).toThrow();
  });
});

describe('isCategoryParams', () => {
  // /category/uncategorized
  test('isCategoryParams should return true with category param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        category: 'uncategorized',
      },
    };

    expect(isCategoryParams(context)).toBe(true);
  });

  test('isCategoryParams should return false with no category param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {},
    };

    expect(isCategoryParams(context)).toBe(false);
  });

  test('isCategoryParams should throw an error if page param is a string array', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        category: ['uncategorized'],
      },
    };

    expect(() => isCategoryParams(context)).toThrow();
  });
});

describe('isPreviewParams', () => {
  // /preview/page?page_id=3&preview=true&p=3
  test('isPreviewParams should return true with preview param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        preview: 'page',
      },
    };

    expect(isPreviewParams(context)).toBe(true);
  });

  test('isPreviewParams should return false with no preview param', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {},
    };

    expect(isPreviewParams(context)).toBe(false);
  });

  test('isPreviewParams should throw an error if page param is a string array', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        preview: ['post'],
      },
    };

    expect(() => isPreviewParams(context)).toThrow();
  });

  test('isPreviewParams should throw an error if preview param is not page|post', () => {
    const context = {
      ...mockedStaticPropsContext,
      params: {
        preview: 'invalid-value',
      },
    };

    expect(() => isPreviewParams(context)).toThrow();
  });
});

describe('getUrlFromContext', () => {
  test('getUrlFromContext returns resolved URL if server side', () => {
    // /sample-page
    const context = {
      ...mockedServerSidePropsContext,
      resolvedUrl: '/sample-page',
    };

    expect(getUrlFromContext(context)).toBe(context.resolvedUrl);
  });

  test('getUrlFromContext infers a post url from static props context', () => {
    // /posts/hello-world
    const context = {
      ...mockedStaticPropsContext,
      params: {
        post: 'hello-world',
      },
    };

    expect(getUrlFromContext(context)).toBe('/posts/hello-world');
  });

  test('getUrlFromContext infers a page url from static props context', () => {
    // /sample-page
    const context = {
      ...mockedStaticPropsContext,
      params: {
        page: 'sample-page',
      },
    };

    expect(getUrlFromContext(context)).toBe('/sample-page');
  });

  test('getUrlFromContext infers a nested page url from static props context', () => {
    // /about/pricing
    const context = {
      ...mockedStaticPropsContext,
      params: {
        page: 'about',
        pageUri: ['pricing'],
      },
    };

    expect(getUrlFromContext(context)).toBe('/about/pricing');
  });

  test('getUrlFromContext infers a category page url from static props context', () => {
    // /category/uncategorized
    const context = {
      ...mockedStaticPropsContext,
      params: {
        category: 'uncategorized',
      },
    };

    expect(getUrlFromContext(context)).toBe('/category/uncategorized');
  });

  test('getUrlFromContext infers a preview page url from static props context', () => {
    // /preview/page?page_id=3&preview=true
    const context = {
      ...mockedStaticPropsContext,
      params: {
        preview: 'page',
      },
    };

    expect(getUrlFromContext(context)).toBe('/preview/page');
  });

  test('getUrlFromContext infers a preview post url from static porps context', () => {
    // /preview/post?p=197&preview=true
    const context = {
      ...mockedStaticPropsContext,
      params: {
        preview: 'post',
      },
    };

    expect(getUrlFromContext(context)).toBe('/preview/post');
  });
});
