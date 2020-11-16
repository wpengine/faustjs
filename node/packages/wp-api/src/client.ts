import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    NormalizedCacheObject,
} from '@apollo/client';
import fetch from 'isomorphic-fetch';
import { getQueryParam, isServerSide } from './utils';

export interface ApiConfig {
    baseUrl: string;
    secret?: string;
}

let cfg: ApiConfig | undefined;

export function config(c?: ApiConfig) {
    if (!c) {
        return cfg;
    }

    let { baseUrl } = c;

    baseUrl = baseUrl.trim();

    if (/\/$/.test(baseUrl)) {
        baseUrl = baseUrl.slice(0, -1);
    }

    cfg = { ...c, baseUrl };

    return cfg;
}

let initializedClient: ApolloClient<NormalizedCacheObject>;

export async function initialize() {
    if (!cfg) {
        throw new Error(
            'You must configure the API with the baseUrl of your Wordpress site and your API secret if this is server-side.',
        );
    }

    if (initializedClient) {
        return initializedClient;
    }

    const client = new ApolloClient({
        link: new HttpLink({
            uri: `${cfg.baseUrl}/graphql`,
        }),
        cache: new InMemoryCache(),
        ssrMode: true,
    });

    if (isServerSide()) {
        return client;
    }

    const {
        location: { search, href },
        location,
        localStorage,
    } = window;
    const isPreview = getQueryParam(search, 'preview') === 'true';

    if (!isPreview) {
        return client;
    }

    const code = getQueryParam(search, 'code');
    let at = localStorage.getItem('wpat');

    if (code) {
        try {
            const response = await fetch('/api/authorize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code,
                }),
            });

            const result = await response.json();

            if (!result || !result.access_token) {
                console.log('Something went wrong');
                console.log(result);
                return client;
            }

            at = result.access_token;

            if (at) {
                localStorage.setItem('wpat', at);
            }

            location.replace(href.replace(/[&?]code=[^&]*/g, ''));
        } catch (e) {
            console.log('Something went wrong');
            console.log(e);
            return client;
        }
    }

    if (!at || at.length === 0) {
        location.replace(
            `${cfg.baseUrl}/generate?redirect_uri=${encodeURIComponent(href)}`,
        );

        return client;
    }

    client.setLink(
        new HttpLink({
            uri: `${cfg.baseUrl}/graphql`,
            headers: {
                Authorization: `Bearer ${at}`,
            },
        }),
    );

    initializedClient = client;

    return client;
}
