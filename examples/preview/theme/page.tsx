import React from 'react';
import { Header, Hero, Footer } from '../components';
import { useGeneralSettings, usePost } from '@wpengine/headless';

export default function Page() {
  const post = usePost();
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-page">
        {post?.title && <Hero title={post?.title} />}
        <div className="wrap">
          {post && (
            <div>
              <div>
                <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
