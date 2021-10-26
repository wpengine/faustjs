---
'@faustjs/next': minor
'@faustjs/core': minor
'@faustjs/react': minor
---

**BREAKING**: Rename `HeadlessProvider` to `FaustProvider`

Example (`_app.tsx`):

```tsx
import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import { client } from 'client';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}
```
