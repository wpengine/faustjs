import React from 'react';
import { useGeneralSettings, usePosts } from '@wpengine/headless/react';
import { Footer, Header, PostsArchive } from '../components';

export default function Category(): JSX.Element {
  const posts = usePosts();
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-index">
        <section className="wrap">
          <p>TODO: remove me – checking that category.tsx is loading.</p>
        </section>
        <PostsArchive posts={posts?.nodes} />
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
