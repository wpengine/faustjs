import React from 'react';
import { usePost, WPHead } from '@wpengine/headless';

export default function Single() {
  const post = usePost();

  return (
    <>
      <WPHead />

      <div>
        {post && (
          <div>
            <div>
              <h5>{post.title}</h5>
              <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
