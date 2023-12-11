/** @jest-environment jsdom */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import * as getConfig from '../../src/config/index.js';
import * as WordPressTemplate from '../../src/components/WordPressTemplate.js';
import * as useAuth from '../../src/hooks/useAuth.js';
import * as client from '../../src/client.js';
import { SEED_QUERY } from '../../src/queries/seedQuery.js';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

describe('<WordPressTemplate />', () => {
  const windowBackup = window;

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    window = windowBackup;
  });

  test('it throws an error if templates are not defined in config', () => {
    const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({});

    expect(() => render(<WordPressTemplate.WordPressTemplate />)).toThrow(
      'Templates are required. Please add them to your config.',
    );
  });

  test('Properly determines whether or not the given URL is a preview or not', async () => {
    const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
      templates: {},
    });

    const useAuthSpy = jest.spyOn(useAuth, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      isReady: true,
      loginUrl: null,
    });

    delete (window as any).location;
    window.location = new URL('http://localhost:3000') as any as Location;

    const stringIncludesSpy = jest.spyOn(String.prototype, 'includes');

    await act(async () => {
      render(
        <WordPressTemplate.WordPressTemplate
          __SEED_NODE__={{ databaseId: '1' }}
          __TEMPLATE_QUERY_DATA__={{ fakeData: true }}
        />,
      );
    });

    expect(window.location.search.includes).toHaveBeenLastCalledWith(
      'preview=true',
    );
    expect(window.location.search.includes).toReturnWith(false);

    delete (window as any).location;
    window.location = new URL(
      'http://localhost:3000?preview=true&p=40',
    ) as any as Location;

    await act(async () => {
      render(
        <WordPressTemplate.WordPressTemplate
          __SEED_NODE__={{ databaseId: '1' }}
          __TEMPLATE_QUERY_DATA__={{ fakeData: true }}
        />,
      );
    });

    expect(window.location.search.includes).toHaveBeenLastCalledWith(
      'preview=true',
    );
    expect(window.location.search.includes).toReturnWith(true);
  });

  test('Properly redirects to login URL on preview route with no logged in user', async () => {
    const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
      templates: {},
    });

    const loginUrl = 'http://testing.local/wp-login.php';

    delete (window as any).location;
    // Preview route
    window.location = new URL(
      'http://localhost:3000/?preview=true&p=40',
    ) as any as Location;
    window.location.assign = jest.fn();

    const windowLocationAssignSpy = jest.spyOn(window.location, 'assign');

    const useAuthSpy = jest.spyOn(useAuth, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      isReady: true,
      loginUrl,
    });

    await act(async () => {
      render(
        <WordPressTemplate.WordPressTemplate
          __SEED_NODE__={{ databaseId: '1' }}
          __TEMPLATE_QUERY_DATA__={{ fakeData: true }}
        />,
      );
    });

    expect(windowLocationAssignSpy).toHaveBeenCalledWith(loginUrl);
  });

  test('makes a request for the seed query if one does not exist', async () => {
    const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
      templates: {},
    });

    const useAuthSpy = jest.spyOn(useAuth, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      isReady: true,
      loginUrl: null,
    });

    const clientQueryMock = jest.fn();
    const getApolloClientSpy = jest
      .spyOn(client, 'getApolloClient')
      .mockImplementation(
        () =>
          ({
            query: clientQueryMock,
          } as any as ApolloClient<NormalizedCacheObject>),
      );

    delete (window as any).location;
    window.location = new URL(
      'http://localhost:3000/my-page',
    ) as any as Location;

    await act(async () => {
      render(<WordPressTemplate.WordPressTemplate />);
    });

    expect(clientQueryMock).toBeCalledWith({
      query: SEED_QUERY,
      variables: {
        uri: '/my-page',
      },
    });
  });

  test('makes a request for the preview seed query if one does not exist', async () => {
    const getConfigSpy = jest.spyOn(getConfig, 'getConfig').mockReturnValue({
      templates: {},
    });

    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    const useAuthSpy = jest.spyOn(useAuth, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      isReady: true,
      loginUrl: null,
    });

    const clientQueryMock = jest.fn();
    const getApolloAuthClientSpy = jest
      .spyOn(client, 'getApolloAuthClient')
      .mockImplementation(
        () =>
          ({
            query: clientQueryMock,
          } as any as ApolloClient<NormalizedCacheObject>),
      );

    delete (window as any).location;
    window.location = new URL(
      'http://localhost:3000/preview?preview=true&p=40&previewPathname=%2Fhello-world%2F',
    ) as any as Location;

    await act(async () => {
      render(<WordPressTemplate.WordPressTemplate />);
    });

    expect(clientQueryMock).toBeCalledWith({
      query: SEED_QUERY,
      variables: {
        asPreview: true,
        id: '40',
      },
    });
  });

  test('Returns the <WordPressTemplateInternal /> component', () => {});
});
