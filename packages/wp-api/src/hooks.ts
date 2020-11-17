import { useEffect, useState } from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initialize } from './client';
import { initialize as initializeServices, Post, PostIdType } from './services';
import { base64Decode, getQueryParam, isServerSide } from './utils';

let services: ReturnType<typeof initializeServices>;

export function useClient() {
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

    useEffect(() => {
        let subscribed = true;

        void void (async () => {
            const initializedClient = await initialize();

            if (!subscribed) {
                return;
            }

            setClient(initializedClient);
        })();

        return () => {
            subscribed = false;
        };
    }, []);

    if (client) {
        services = initializeServices(client);
    }

    return client;
}

function useService<R = any>(
    service: typeof services[keyof typeof services],
    ...args: any[]
): R | undefined {
    const [result, setResult] = useState<R>();

    useEffect(() => {
        let subscribed = true;

        void (async () => {
            const p: R = await (service as (...a: any[]) => Promise<any>)(
                ...args,
            );

            if (subscribed) {
                setResult(p);
            }
        })();

        return () => {
            subscribed = false;
        };
    });

    return result;
}

export function usePosts() {
    return useService<Post[]>(services.posts);
}

export function usePostByType(uid: string, idType?: PostIdType) {
    return useService<Post>(services.post, uid, idType);
}

function useRevision(id: string) {
    return useService<Post>(services.revision, id);
}

/* eslint-disable react-hooks/rules-of-hooks */
export function usePost(uid: string) {
    const decoded = base64Decode(uid) || '';
    const status = isServerSide()
        ? ''
        : getQueryParam(window.location.search, 'status');

    if (decoded.indexOf('post:') === 0) {
        if (status === 'inherit') {
            return useRevision(decoded.split(':')[1]);
        }

        return usePostByType(uid, PostIdType.ID);
    }

    return usePostByType(uid, PostIdType.SLUG);
}
/* eslint-enable react-hooks/rules-of-hooks */
