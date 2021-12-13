---
'@faustjs/core': bump
'@faustjs/next': bump
'@faustjs/react': bump
'faustwp': bump
---

Introduced the `usePreviewNode` hook to get preview data from any post type. You can use it like so:

```tsx
import type { Page, Post } from 'client';
import { client } from 'client';

export default function Preview() {
  const isLoading = client.useIsLoading();
  const { typeName, node } = client.auth.usePreviewNode();

  if (isLoading || node === undefined) {
    return <p>Loading...</p>;
  }

  if (node === null) {
    return <p>Post not found</p>;
  }

  switch (typeName) {
    case 'Page': {
      const page = node as Page;
      return (
        <>
          <h1>{page.title()}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content() }} />
        </>
      );
    }
    case 'Post': {
      const post = node as Post;
      return (
        <>
          <h1>{post.title()}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content() }} />
        </>
      );
    }
    // Add custom post types here as needed
    default: {
      throw new Error(`Unknown post type: ${typeName}`);
    }
  }
}
```

With `usePreviewNode`, we have deprecated the `usePreview` hook. It is still available, but it is recommended to use `usePreviewNode` instead.
