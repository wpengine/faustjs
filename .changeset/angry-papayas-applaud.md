---
'@faustwp/core': patch
---

Bug Fix: `useLogin` and `fetchAccessToken` access token `code` parameter is now properly escaped. Fixes bug with authentication not workin on Vercel.
