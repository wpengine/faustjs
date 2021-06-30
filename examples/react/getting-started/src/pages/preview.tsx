import { ensureAuthorization } from '@faustjs/core';
import {
  client,
  Page as PageType,
  Post as PostType,
  PageIdType,
  PostIdType,
} from 'client';
import { PageTemplate, PostTemplate } from 'components';
import queryString from 'query-string';
import { useEffect } from 'react';

export default function Preview() {
  const { usePost, usePage, useIsLoading } = client;
  const isLoading = useIsLoading();

  useEffect(() => {
    const authRes = ensureAuthorization(window.location.href);

    if (typeof authRes !== 'string' && authRes?.redirect) {
      setTimeout(() => {
        window.location.replace(authRes.redirect);
      }, 200);
    }
  }, []);

  const { p, page_id, preview } = queryString.parse(window.location.search);

  const page = usePage({
    id: p as string,
    idType: PageIdType.DATABASE_ID,
  });

  const post = usePost({
    id: p as string,
    idType: PostIdType.DATABASE_ID,
  });

  if (page_id && preview) {
    return <PageTemplate page={page as PageType} isLoading={isLoading} />;
  } else {
    return <PostTemplate post={post as PostType} isLoading={isLoading} />;
  }
}
