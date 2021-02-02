import React from 'react';
import {
  useGeneralSettings,
  usePosts,
  useNextUriInfo,
} from '@wpengine/headless';
import { Footer, Header, Posts } from '../components';
import FrontPage from './front-page';

export default function Index(): JSX.Element {
  const posts = usePosts();
  const settings = useGeneralSettings();
  const uri = useNextUriInfo();

  // Loads front-page.tsx if Settings → Reading uses “Your latest posts”.
  if (uri?.uriPath === '/') {
    return <FrontPage />;
  }

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <Posts posts={posts} />
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
