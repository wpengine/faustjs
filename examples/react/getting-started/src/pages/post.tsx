import { Post as PostType, PostIdType } from '@wpengine/headless-core';
import { PostTemplate } from 'components';
import { client } from '@wpengine/headless-react';
import { useParams } from 'react-router';

type PostParams = {
  postSlug: string;
};

export default function Post() {
  const { postSlug } = useParams<PostParams>();
  const { usePost, useIsLoading } = client();
  const isLoading = useIsLoading();

  const post = usePost({
    id: postSlug,
    idType: PostIdType.URI,
  });

  return <PostTemplate post={post as PostType} isLoading={isLoading} />;
}
