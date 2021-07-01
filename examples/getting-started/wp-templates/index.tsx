import React from 'react';
import { useGeneralSettings, usePosts } from '@wpengine/headless/react';
import { Footer, Header, Posts } from '../components';

export default function Index(): JSX.Element {
  const posts = usePosts();
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <Posts posts={posts?.nodes} />
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
