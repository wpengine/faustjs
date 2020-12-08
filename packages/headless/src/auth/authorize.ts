import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ServerResponse } from 'http';
import { Redirect } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { isServerSide, trimTrailingSlash } from '../utils';
import { getAccessToken, storeAccessToken } from './cookie';

const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);
const API_CLIENT_SECRET = process.env.WPE_HEADLESS_SECRET;

if (!API_CLIENT_SECRET && isServerSide()) {
  throw new Error(
    'WPE_HEADLESS_SECRET environment variable is not set. Please set it to your WPGraphQL endpoint if you wish to use authenticated API calls.',
  );
}

export async function authorize(code: string) {
  const response = await fetch(
    `${WP_URL as string}/wp-json/wpac/v1/authorize`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-wpe-headless-secret': API_CLIENT_SECRET as string,
      },
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
    },
  );

  const result = (await response.json()) as { access_token?: string };

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw {
      error: result,
      status: response.status,
    };
  }

  return result;
}

// eslint-disable-next-line consistent-return
export async function ensureAuthorization(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  query: ParsedUrlQuery,
  res: ServerResponse,
): Promise<{ redirect?: Redirect }> {
  let accessToken = getAccessToken();
  const { code } = query;
  const http = /localhost/.test(url) ? 'http' : 'https';

  if (typeof code === 'string') {
    try {
      const result = await authorize(code);
      accessToken = result.access_token;
      storeAccessToken(accessToken, res);

      return {
        redirect: {
          permanent: false,
          destination: `${http}://${url.replace(
            /(&?code(=[^&]*)?(?=&|$)|^foo(=[^&]*)?)(&|$)/,
            '',
          )}`,
        },
      };
    } catch (e) {
      console.log('Something went wrong');
      console.log(e);

      storeAccessToken(undefined, res);
      return {};
    }
  }

  if (!accessToken || accessToken.length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: `${
          WP_URL as string
        }/generate?redirect_uri=${encodeURIComponent(`${http}://${url}`)}`,
      },
    };
  }

  return {};
}
