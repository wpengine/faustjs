import { Footer, Header, Posts } from 'components';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { client } from 'client';

type CategoryParams = {
  categorySlug: string;
};

export default function Category() {
  const { categorySlug } = useParams<CategoryParams>();
  const { useQuery, useIsLoading } = client;
  const isLoading = useIsLoading();

  const posts = useQuery().posts({
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
          <Posts isLoading={isLoading} posts={posts?.nodes} />
        </div>
      </main>

      <Footer />
    </>
  );
}
