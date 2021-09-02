import { PageComponent } from './[...pageUri]';
import { PostComponent } from './posts/[postSlug]';
import { client } from 'client';

export default function Preview() {
  const { usePreview } = client.auth;
  const result = usePreview();

  if (client.useIsLoading()) {
    return <p>loading...</p>;
  }

  if (!result) {
    return <>Not Found</>;
  }

  if (result.type === 'page') {
    return <PageComponent page={result.page} />;
  }

  return <PostComponent post={result.post} />;
}
