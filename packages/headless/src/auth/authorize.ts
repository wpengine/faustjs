import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { addAuthorization } from '../graphql';
import { isServerSide } from '../utils';
import { getAccessToken, storeAccessToken } from './cookie';

const WP_URL =
    process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL;
const API_CLIENT_SECRET = process.env.WPE_HEADLESS_SECRET;

if (!API_CLIENT_SECRET && isServerSide()) {
    throw new Error(
        'WPE_HEADLESS_SECRET environment variable is not set. Please set it to your WPGraphQL endpoint if you wish to use authenticated API calls.'
    );
}

export async function authorize(code: string) {
    const response = await fetch(`${ WP_URL }/wp-json/wpac/v1/authorize`, {
        headers: {
            'Content-Type': 'application/json',
            'x-wpe-headless-secret': API_CLIENT_SECRET as string,
        },
        method: 'POST',
        body: JSON.stringify({
            code,
        }),
    });

    const result = (await response.json()) as { access_token?: string; };

    if (!response.ok) {
        throw {
            error: result,
            status: response.status,
        };
    }

    return result;
}

export async function ensureAuthorization(client: ApolloClient<NormalizedCacheObject>, url: string, query: ParsedUrlQuery, res: ServerResponse): Promise<boolean | undefined> {
    let accessToken = getAccessToken();
    const code = query.code;
    const http = /localhost/.test(url) ? 'http' : 'https';

    if (typeof code === 'string') {
        try {
            const result = await authorize(code);
            accessToken = result.access_token;
            storeAccessToken(accessToken, res);
            res.statusCode = 302;
            res.setHeader('Location', `${http}://${url.replace(/(&?code(\=[^&]*)?(?=&|$)|^foo(\=[^&]*)?)(&|$)/, '')}`);
            res.end();

            return true;
        } catch (e) {
            console.log('Something went wrong');
            console.log(e);
            return;
        }
    }

    if (!accessToken || accessToken.length === 0) {
        res.statusCode = 302;
        res.setHeader('Location', `${ WP_URL }/generate?redirect_uri=${ encodeURIComponent(`${http}://${url}`) }`);
        res.end();

        return true;
    }

    addAuthorization(client, accessToken);
}
