---
'@faustwp/core': patch
---

Introduced the `useLogout` hook to handle logging out in your Faust app:

```js
import { useLogout } from '@faustwp/core';

const { error, logout, loading } = useLogin();
```

Please visit the [reference docs](https://faustjs.org/docs/reference/useLogout) for more information on the API.
