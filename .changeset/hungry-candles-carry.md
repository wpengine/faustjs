---
'@faustwp/core': patch
---

Introduced the `useLogin` hook to handle logging into your Faust app without being redirected to WordPress:

```js
import { useLogin } from '@faustwp/core';

const { login, loading, data, error } = useLogin();
```

Please visit the [reference docs](https://faustjs.org/docs/reference/useLogin) for more information on the API.
