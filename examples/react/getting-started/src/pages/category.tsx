import { useParams } from 'react-router';
import client from '../lib/client';
import { Link } from 'react-router-dom';

type CategoryParams = {
  categorySlug: string;
};

export default function Category() {
  const { categorySlug } = useParams<CategoryParams>();
  const { usePosts } = client;

  const posts = usePosts({
    where: {
      categoryName: categorySlug,
    },
  });

  return (
    <div>
      <h2>Category: {categorySlug}</h2>

      {posts?.nodes?.map((post) => (
        <article key={post?.id}>
          <h2>
            <Link to={`/posts/${post?.slug}`}>{post?.title()}</Link>
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: post?.excerpt() || '',
            }}
          />
        </article>
      ))}
    </div>
  );
}
