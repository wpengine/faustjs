---
'@faustwp/experimental-app-router': minor
---

BREAKING CHANGE: Since app router requests are made server side and the preview post request originates from WordPress, the cookie isn’t reachable. Changing the cookie to SameSite=Lax resolves the problem.
