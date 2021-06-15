import { Page } from '@wpengine/headless-core';
import { Footer, Header, PostPageLoader } from 'components';

type PageTemplateProps = {
  page: Page | undefined;
  isLoading: boolean;
};

export default function PageTemplate({ page, isLoading }: PageTemplateProps) {
  return (
    <>
      <Header />

      <main className="content content-single">
        <div className="wrap">
          {isLoading && <PostPageLoader />}

          <h1>{page?.title()}</h1>
          <div dangerouslySetInnerHTML={{ __html: page?.content() || '' }} />
        </div>
      </main>

      <Footer />
    </>
  );
}
