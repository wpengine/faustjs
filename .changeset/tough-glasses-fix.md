---
'@faustjs/core': minor
---

Introduced the `apiRouter` that will handle all of the Faust.js related endpoints for you.

## Breaking Changes

With the introduction of `apiRouter` we have introduced a breaking change. You will need to remove your `pages/api/auth/wpe-headless.ts` file, and create a new file, `pages/api/faust/[[...route]].ts` with the following content:

```ts
import 'faust.config';
import { apiRouter } from '@faustjs/core/api';

export default apiRouter;
```

**Note**: The `[[...route]]` naming convention is a [Next.js convention for a catch-all route.](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes)

### Config changes

The `apiEndpoint` and `apiUrl` config options have been removed in exchange for the `apiBasePath` option. This option specifies the base path for all of the Faust.js endpoints. The `blogUrlPrefix` is no longer necessary and has been removed from the config interface.
