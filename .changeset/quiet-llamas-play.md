---
'@faustwp/experimental-app-router': patch
---

Introduced a new API handler for App router projects called `faustRouteHandler`. It can be used by creating a file `/app/api/faust/[route]/route.js` with the following contents:

```js
// /app/api/faust/[route]/route.js
import { faustRouteHandler } from '@faustwp/experimental-app-router';

const { GET, POST } = faustRouteHandler;

export { GET, POST };
```
