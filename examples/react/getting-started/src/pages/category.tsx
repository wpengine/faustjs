import { Post } from '@wpengine/headless-core';
import { Footer, Header, Posts } from 'components';
import client from 'lib/client';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

type CategoryParams = {
  categorySlug: string;
};

export default function Category() {
  const { categorySlug } = useParams<CategoryParams>();
  const { usePosts, useIsLoading } = client;
  const isLoading = useIsLoading();

  const posts = usePosts({
    where: {
      categoryName: categorySlug,
    },
  });

  return (
    <>
      <Helmet>
        <title>Posts from {categorySlug}</title>
      </Helmet>

      <Header />

      <main className="content content-single">
        <div className="wrap">
          <Posts
            isLoading={isLoading}
            posts={posts?.nodes as Post[] | undefined}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
