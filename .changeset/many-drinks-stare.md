---
'@faustwp/core': minor
---

**BREAKING**: Changed the default behavior in Apollo to use `GET` requests to leverage cached requests where possible. This option can now be modified with the `useGETForQueries` option in `faust.config.js`
