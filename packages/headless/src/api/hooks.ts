import { useEffect, useState, useContext } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient,
} from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Post,
  ContentNodeIdType,
  ContentNode,
  GeneralSettings,
  UriInfo,
} from '../types';
import { posts, generalSettings, contentNode, uriInfo } from './services';
import { Context } from './context';

function useApi<R = any>(
  service: typeof posts | typeof contentNode,
  ...args: any[]
): R | undefined {
  const [result, setResult] = useState<R>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;
    if (client) {
      void (async () => {
        const p = (await (service as (
          client: ApolloClient<NormalizedCacheObject>,
          ...a: any[]
        ) => Promise<any>)(
          client as ApolloClient<NormalizedCacheObject>,
          ...args,
        )) as R;

        if (subscribed) {
          setResult(p);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, service, ...args]);

  return result;
}

export function usePosts() {
  return useApi<Post[]>(posts);
}

/* eslint-disable react-hooks/rules-of-hooks */
export function usePost(uid?: string, idType?: ContentNodeIdType) {
  const { pageInfo } = useContext(Context);

  if (!uid && !!pageInfo) {
    return useApi<ContentNode>(
      contentNode,
      pageInfo.uriPath,
      ContentNodeIdType.URI,
      pageInfo.isPreview,
    );
  }

  if (!uid) {
    return undefined;
  }

  return useApi<ContentNode>(contentNode, uid, idType);
}
/* eslint-enable react-hooks/rules-of-hooks */

export function useGeneralSettings() {
  const [result, setResult] = useState<GeneralSettings>();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;

    if (client) {
      void (async () => {
        const settings = await generalSettings(
          client as ApolloClient<NormalizedCacheObject>,
        );

        if (subscribed && !!settings) {
          setResult(settings);
        }
      })();
    }

    return () => {
      subscribed = false;
    };
  }, [result, client]);

  return result;
}

export function useUriInfo() {
  const [pageInfo, setUriInfo] = useState<UriInfo>();
  const router = useRouter();
  const client = useApolloClient();

  useEffect(() => {
    let subscribed = true;

    if (router) {
      const page = router.asPath;

      if (page.indexOf('[[') === -1) {
        void (async () => {
          const info = await uriInfo(
            client as ApolloClient<NormalizedCacheObject>,
            page,
          );

          if (!subscribed) {
            return;
          }

          setUriInfo(info);
        })();
      }
    }

    return () => {
      subscribed = false;
    };
  }, [router, client]);

  return pageInfo;
}
