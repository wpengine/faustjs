---
'@faustwp/core': patch
---

Fixed logout and rejected refresh tokens leaving an empty refresh token cookie with a 30-day lifetime instead of expiring it.
