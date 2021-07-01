import { PostTemplate } from 'components';
import { client, PostIdType } from 'client';
import { useParams } from 'react-router';

type PostParams = {
  postSlug: string;
};

export default function Post() {
  const { postSlug } = useParams<PostParams>();
  const { useQuery, useIsLoading } = client;
  const isLoading = useIsLoading();

  const post = useQuery().post({
    id: postSlug,
    idType: PostIdType.URI,
  });

  return <PostTemplate post={post} isLoading={isLoading} />;
}
