---
'@faustwp/wordpress-plugin': minor
---

Added support for anonymous opt-in telemetry. Previously this functionality was in the Faust CLI package, but has been moved to the WordPress plugin instead. All telemetry collection is optional and anonymous, and it is disabled by default. If you were previously opted in from Faust CLI, once you update the Faust CLI packages your site will no longer send telemetry data unless you opt in again from the WordPress plugin.
