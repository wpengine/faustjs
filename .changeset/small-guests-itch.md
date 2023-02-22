---
'@faustwp/core': patch
---

Re-introduced the `useAuth` hook to handle authentication in your Faust app:

```js
import {useAuth} from '@faustwp/core'

const {isAuthenticated, isReady, loginUrl} = useAuth(options?);
```

Please visit the [reference docs](https://faustjs.org/docs/reference/useAuth) for more information on the API.
