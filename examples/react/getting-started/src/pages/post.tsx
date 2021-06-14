import { PostIdType } from '@wpengine/headless-react/node_modules/@wpengine/headless-core';
import { useParams } from 'react-router';
import client from '../lib/client';

type PostParams = {
  postSlug: string;
};

export default function Post() {
  const { usePost } = client;
  const { postSlug } = useParams<PostParams>();

  const post = usePost({
    id: postSlug,
    idType: PostIdType.URI,
  });

  return (
    <>
      <h1>{post?.title()}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.content() || '' }} />
    </>
  );
}
