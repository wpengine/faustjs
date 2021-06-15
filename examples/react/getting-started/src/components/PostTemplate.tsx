import { Header, Footer, PostPageLoader } from 'components';
import { Post } from '@wpengine/headless-core';

type PostTemplateProps = {
  post: Post | undefined;
  isLoading: boolean;
};

export default function PostTemplate({ post, isLoading }: PostTemplateProps) {
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
