---
'@faustjs/core': patch
---

Fixed a bug where expired refresh tokens were not being cleared from the browser cookie, possibly resulting in infinite loops during authentication, or an inability to request authenticated content.
