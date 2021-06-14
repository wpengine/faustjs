import { PostIdType } from '@wpengine/headless-core';
import { useParams } from 'react-router';
import client from 'lib/client';
import { Header, Footer, PostPageLoader } from 'components';

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

  return (
    <>
      <Header />

      <main className="content content-single">
        <div className="wrap">
          {isLoading && <PostPageLoader />}

          <h1>{post?.title()}</h1>
          <div dangerouslySetInnerHTML={{ __html: post?.content() || '' }} />
        </div>
      </main>

      <Footer />
    </>
  );
}
