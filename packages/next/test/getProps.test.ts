import { gql } from '@apollo/client';
import { ContentNodeOptions, ListPostOptions } from '@wpengine/headless-core';
import { QueriesConfig } from '@wpengine/headless-react';
import { stringifyQueries } from '../src/getProps';

describe('stringifyQueries', () => {
  const postFragmentPostData = gql`
    fragment postData on Post {
      title
      content
    }
  `;
  const postFragmentPostDataStr =
    'fragment postData on Post {\n  title\n  content\n}\n';

  const postFragmentPageData = gql`
    fragment pageData on Page {
      title
      content
    }
  `;
  const postFragmentPageDataStr =
    'fragment pageData on Page {\n  title\n  content\n}\n';

  const postsFragmentListPostData = gql`
    fragment listPostData on Post {
      title
      excerpt
      uri
    }
  `;
  const postsFragmentListPostDataStr =
    'fragment listPostData on Post {\n  title\n  excerpt\n  uri\n}\n';

  const postVariables: ContentNodeOptions['variables'] = {
    id: '/hello-world',
    idType: 'URI',
  };
  const postsVariables: ListPostOptions['variables'] = {
    first: 10,
  };

  test('it should stringify post fragments postData', () => {
    const queries: QueriesConfig = {
      post: {
        fragments: {
          postData: postFragmentPostData,
        },
        variables: postVariables,
      },
    };

    const expectedResult = {
      post: {
        variables: postVariables,
        fragments: {
          postData: postFragmentPostDataStr,
          pageData: null,
        },
      },
    };

    expect(stringifyQueries(queries)).toStrictEqual(expectedResult);
  });

  test('it should stringify post fragments pageData', () => {
    const queries: QueriesConfig = {
      post: {
        fragments: {
          pageData: postFragmentPageData,
        },
        variables: postVariables,
      },
    };

    const expectedResult = {
      post: {
        variables: postVariables,
        fragments: {
          postData: null,
          pageData: postFragmentPageDataStr,
        },
      },
    };

    expect(stringifyQueries(queries)).toStrictEqual(expectedResult);
  });

  test('it should return post and posts if both are specified', () => {
    const queries: QueriesConfig = {
      post: {
        fragments: {
          pageData: postFragmentPageData,
          postData: postFragmentPostData,
        },
        variables: postVariables,
      },
    };

    const expectedResult = {
      post: {
        variables: postVariables,
        fragments: {
          postData: postFragmentPostDataStr,
          pageData: postFragmentPageDataStr,
        },
      },
    };

    expect(stringifyQueries(queries)).toStrictEqual(expectedResult);
  });

  test('it should stringify posts fragments listPostData', () => {
    const queries: QueriesConfig = {
      posts: {
        fragments: {
          listPostData: postsFragmentListPostData,
        },
        variables: postsVariables,
      },
    };

    const expectedResult = {
      posts: {
        variables: postsVariables,
        fragments: {
          listPostData: postsFragmentListPostDataStr,
        },
      },
    };

    expect(stringifyQueries(queries)).toStrictEqual(expectedResult);
  });
});
