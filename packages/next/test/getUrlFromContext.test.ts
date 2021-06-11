import {
  getUrlFromContext,
  isCategoryParams,
  isPageParams,
  isPostParams,
  isPreviewParams,
} from '../src/getUrlFromContext';
import {
  mockedServerSidePropsContext,
  mockedStaticPropsContext,
} from '../jest.setup';

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

  test('getUrlFromContext infers a category page url with pagination from static props context', () => {
    // /category/uncategorized/before/cursor-position
    const beforeContext = {
      ...mockedStaticPropsContext,
      params: {
        category: 'uncategorized',
        categoryUri: ['before', 'cursor-position'],
      },
    };

    // /category/uncategorized/after/cursor-position
    const afterContext = {
      ...mockedStaticPropsContext,
      params: {
        category: 'uncategorized',
        categoryUri: ['after', 'cursor-position'],
      },
    };

    expect(getUrlFromContext(beforeContext)).toBe(
      '/category/uncategorized/before/cursor-position',
    );
    expect(getUrlFromContext(afterContext)).toBe(
      '/category/uncategorized/after/cursor-position',
    );
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

  test('getUrlFromContext infers a preview post url from static props context', () => {
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
