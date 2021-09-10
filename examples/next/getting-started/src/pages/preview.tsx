import { PageComponent } from './[...pageUri]';
import { PostComponent } from './posts/[postSlug]';
import { client } from 'client';

export default function Preview() {
  const { usePreview } = client.auth;
  const result = usePreview();

  if (client.useIsLoading() || !result) {
    return <p>loading...</p>;
  }

  if (result.type === 'page') {
    if (!result.page) {
      return <>Not Found</>;
    }

    return <PageComponent page={result.page} />;
  }

  if (!result.post) {
    return <>Not Found</>;
  }

  return <PostComponent post={result.post} />;
}
