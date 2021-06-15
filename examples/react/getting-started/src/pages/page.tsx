import { Page as PageType, PageIdType } from '@wpengine/headless-core';
import { PageTemplate } from 'components';
import client from 'lib/client';
import { useParams } from 'react-router';

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

  return <PageTemplate page={page as PageType} isLoading={isLoading} />;
}
