import * as client from '../src/client';
import * as apolloClient from '@apollo/client';
import * as persistedQueriesLink from '@apollo/client/link/persisted-queries';
import * as apolloLinkContext from '@apollo/client/link/context';
import { FaustConfig, setConfig } from '../src/config';

afterEach(() => {
  jest.clearAllMocks();
});

describe('createApolloClient', () => {
  const httpLinkSpy = jest.spyOn(apolloClient, 'createHttpLink');
  const setContextLinkSpy = jest.spyOn(apolloLinkContext, 'setContext');
  const persistedQueriesLinkSpy = jest.spyOn(
    persistedQueriesLink,
    'createPersistedQueryLink',
  );

  const envBackup = process.env;

  beforeEach(() => {
    process.env = { ...envBackup };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = envBackup;
  });

  it('calls the appropriate default Apollo links', () => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    client.createApolloClient();
    expect(httpLinkSpy).toHaveBeenCalledTimes(1);

    expect(httpLinkSpy).toHaveBeenCalledWith({
      uri: 'http://headless.local/index.php?graphql',
      useGETForQueries: true,
    });
  });

  it('uses the useGETForQueries option', () => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    setConfig({
      useGETForQueries: false,
    } as any as FaustConfig);

    client.createApolloClient();

    expect(httpLinkSpy).toHaveBeenCalledWith({
      uri: 'http://headless.local/index.php?graphql',
      useGETForQueries: false,
    });

    setConfig({
      useGETForQueries: true,
    } as any as FaustConfig);

    client.createApolloClient();

    expect(httpLinkSpy).toHaveBeenCalledWith({
      uri: 'http://headless.local/index.php?graphql',
      useGETForQueries: true,
    });

    expect(httpLinkSpy).toHaveBeenCalledTimes(2);
  });

  it('invokes the persisted queries link if the option is enabled', () => {
    setConfig({
      usePersistedQueries: true,
    } as any as FaustConfig);

    client.createApolloClient();

    expect(httpLinkSpy).toHaveBeenCalledTimes(1);
    expect(persistedQueriesLinkSpy).toHaveBeenCalledTimes(1);
  });

  it('Does not set useGETForQueries in HttpLink if persisted queries is enabled', () => {
    process.env.NEXT_PUBLIC_WORDPRESS_URL = 'http://headless.local';

    setConfig({
      usePersistedQueries: true,
    } as any as FaustConfig);

    client.createApolloClient();

    expect(httpLinkSpy).toHaveBeenCalledTimes(1);

    expect(httpLinkSpy).toHaveBeenCalledWith({
      uri: 'http://headless.local/index.php?graphql',
      useGETForQueries: false,
    });

    expect(persistedQueriesLinkSpy).toHaveBeenCalledTimes(1);
  });

  it('invokes setContext to set the proper auth headers if its an auth client', () => {
    client.createApolloClient(true);

    expect(setContextLinkSpy).toHaveBeenCalledTimes(1);
  });
});
