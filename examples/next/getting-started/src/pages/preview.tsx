import { client } from '@wpengine/headless-next';
import { useRouter } from 'next/router';
import { PageComponent } from './[...pageUri]';
import type { Page, Post } from '@wpengine/headless-core';
import { PostComponent } from './posts/[postSlug]';

export default function Preview() {
  const { query: { p, page_id }} = useRouter();
  const { usePreview } = client();
  const isPage = !!page_id;
  let postOrPage: Page | Post | null;

  if (isPage) {
    postOrPage = usePreview({
      pageId: p as string,
    });
  } else {
    postOrPage = usePreview({
      postId: p as string,
    });
  }

  if (postOrPage === null) {
    return <>Not Found</>;
  }

  if (isPage) {
    return <PageComponent preview page={postOrPage as Page} />;
  }

  return <PostComponent preview post={postOrPage as Post} />;
}
