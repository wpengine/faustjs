---
'@faustwp/core': minor
---

**BREAKING:** By default, Faust is now using GET for GraphQL requests in Apollo. If you would like to switch back to POST requests, you can do so by setting the `useGETForQueries` property to `false` in `faust.config.js`
