import { client } from '@wpengine/headless-next';
import { useRouter } from 'next/router';
import { PostComponent } from './[postSlug]';

export default function Page() {
  const { query: { p }} = useRouter();
  const { usePreview } = client();
  const post = usePreview({
    postId: p as string,
  });

  if (post === null) {
    return <>Not Found</>;
  }

  return <PostComponent preview post={post} />;
}
