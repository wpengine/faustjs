---
"@faustwp/wordpress-plugin": patch
---

Fixed public route redirects repeating the subdirectory when WordPress is installed in one, such as `https://example.com/wp`, which could cause a redirect loop when the front end runs on the same domain. Requests now redirect to the matching front-end path.
