import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import { usePost } from '@wpengine/headless/next';
import { Header, Hero, Footer } from '../components';

export default function Page(): JSX.Element {
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
                {/* eslint-disable-next-line react/no-danger */}
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
