---
'@faustwp/core': patch
---

Create `FaustPage<Data, Props>` TypeScript type for Next.js pages that use Faust helpers:

```tsx
import { FaustPage } from '@faustwp/core';

type GetPageData = {
  generalSettings: {
    title: string;
  };
};

type PageProps = {
  myProp: string;
};

const Page: FaustPage<GetPageData, PageProps> = (props) => {
  const { myProp, data } = props;
  return <></>;
};
```
