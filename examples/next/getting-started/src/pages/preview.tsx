import { useRouter } from "next/router";
import { PageComponent } from "./[...pageUri]";
import type { Page, Post } from "@wpengine/headless-core";
import { PostComponent } from "./posts/[postSlug]";
import { client } from 'client';

export default function Preview() {
  const {
    query: { p, page_id },
  } = useRouter();
  const { usePreview } = client;
  const isPage = !!page_id;

  const postOrPage: unknown = usePreview({
    pageId: isPage ? (p as string) : undefined,
    postId: !isPage ? (p as string) : undefined,
  } as any);

  if (postOrPage === null) {
    return <>Not Found</>;
  }

  if (isPage) {
    return <PageComponent preview page={postOrPage as Page} />;
  }

  return <PostComponent preview post={postOrPage as Post} />;
}
