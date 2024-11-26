---
'@faustwp/experimental-app-router': minor
---

---

## '@faustwp/experimental-app-router': minor

Update @faustwp/experimental-app-router to account for next 15 changes to cookies and update NextResponse import

Notable changes:

- Adding await to all cookies requests as per Next documentation: https://nextjs.org/docs/app/api-reference/functions/cookies

```
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  return '...'
}
```

- Files changed:

  - packages/experimental-app-router/src/server-actions/logoutAction.ts
  - packages/experimental-app-router/src/server-actions/utils/setRefreshToken.ts
  - packages/experimental-app-router/src/server/auth/fetchTokens.ts
  - packages/experimental-app-router/src/server/routeHandler/tokenHandler.ts

- Updated Next App Router example to use latest next version and React 19 RC.
- Updated Example Login form using React 19s useActionState
- Files Changed:
  - examples/next/app-router/app/login/page.tsx
  - examples/next/app-router/package.json
