import { Header, Footer, PostPageLoader } from 'components';
import { Helmet } from 'react-helmet-async';
import { Post } from 'types';

type PostTemplateProps = {
  post: Post | null;
  isLoading: boolean;
};

export default function PostTemplate({ post, isLoading }: PostTemplateProps) {
  return (
    <>
      <Helmet>
        <title>{post?.title()}</title>
      </Helmet>

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
