import { PostTemplate } from 'components';
import { client } from 'client';
import { useParams } from 'react-router';
import { PostIdType } from 'types';

type PostParams = {
  postSlug: string;
};

export default function Post() {
  const { postSlug } = useParams<PostParams>();
  const { usePost, useIsLoading } = client;
  const isLoading = useIsLoading();

  const post = usePost({
    id: postSlug,
    idType: PostIdType.URI,
  });

  return <PostTemplate post={post} isLoading={isLoading} />;
}
