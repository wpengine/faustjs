import { useParams } from 'react-router';
import { PageIdType } from '@wpengine/headless-core';
import client from '../lib/client';

type PageParams = {
  pageSlug: string;
};

export default function Page() {
  const { usePage } = client;
  const { pageSlug } = useParams<PageParams>();
  const page = usePage({
    id: pageSlug,
    idType: PageIdType.URI,
  });

  return (
    <>
      <h1>{page?.title()}</h1>
      <div dangerouslySetInnerHTML={{ __html: page?.content() || '' }} />
    </>
  );
}
