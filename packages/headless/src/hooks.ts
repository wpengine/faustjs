import { useEffect, useState } from 'react';
import {
  posts,
  post,
  revision,
  Post, PostIdType
} from './services';
import { base64Decode, getQueryParam, isServerSide } from './utils';
import { ApolloClient, NormalizedCacheObject, useApolloClient } from '@apollo/client';

function useService<R = any>(
  service: typeof posts | typeof post | typeof revision,
  ...args: any[]
): R | undefined {
  const [result, setResult] = useState<R>();
  const client = useApolloClient();

  useEffect(() => {
    if (!client) {
      return;
    }

    let subscribed = true;

    void (async () => {
      const p = (await (service as (client: ApolloClient<NormalizedCacheObject>, ...a: any[]) => Promise<any>)(
        client as ApolloClient<NormalizedCacheObject>,
        ...args,
      )) as R;

      if (subscribed) {
        setResult(p);
      }
    })();

    return () => {
      subscribed = false;
    };
  }, [client]);

  return result;
}

export function usePosts() {
  return useService<Post[]>(posts);
}

export function usePostByType(uid: string, idType?: PostIdType) {
  return useService<Post>(post, uid, idType);
}

function useRevision(id: string) {
  return useService<Post>(revision, id);
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
