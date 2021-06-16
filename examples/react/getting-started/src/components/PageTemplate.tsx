import { Footer, Header, PostPageLoader } from 'components';
import { Helmet } from 'react-helmet-async';
import { Page } from 'types';

type PageTemplateProps = {
  page: Page | null;
  isLoading: boolean;
};

export default function PageTemplate({ page, isLoading }: PageTemplateProps) {
  return (
    <>
      <Helmet>
        <title>{page?.title()}</title>
      </Helmet>

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
