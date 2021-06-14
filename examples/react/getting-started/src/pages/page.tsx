import { useParams } from 'react-router';
import { PageIdType } from '@wpengine/headless-core';
import client from 'lib/client';
import { Header, Footer, PostPageLoader } from 'components';

type PageParams = {
  pageSlug: string;
};

export default function Page() {
  const { pageSlug } = useParams<PageParams>();
  const { usePage, useIsLoading } = client;
  const isLoading = useIsLoading();
  const page = usePage({
    id: pageSlug,
    idType: PageIdType.URI,
  });

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
