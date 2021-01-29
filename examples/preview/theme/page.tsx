import React from 'react';
import { usePost, WPHead } from '@wpengine/headless';

export default function Page() {
  const post = usePost();

  return (
    <>
      <WPHead />

      <div>
        {post && (
          <div>
            <div>
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
