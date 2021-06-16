import { client } from '@wpengine/headless-react';
import { PageTemplate } from 'components';
import { useParams } from 'react-router';
import { Page as PageType, PageIdType } from 'types';

type PageParams = {
  pageSlug: string;
};

export default function Page() {
  const { pageSlug } = useParams<PageParams>();
  const { usePage, useIsLoading } = client();
  const isLoading = useIsLoading();
  const page = usePage({
    id: pageSlug,
    idType: PageIdType.URI,
  });

  return <PageTemplate page={page as PageType} isLoading={isLoading} />;
}
