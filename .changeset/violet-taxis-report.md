---
'@faustwp/experimental-app-router': patch
---

Added: New util for fetching data on the client side. In a client component (`use client`), you can now use Apollo's `useQuery` to fetch data once your application is wrapped with the `<FaustProvider>` component. This new component is available via:

```tsx
import { FaustProvider } from '@faustwp/experimental-app-router/ssr';
```
