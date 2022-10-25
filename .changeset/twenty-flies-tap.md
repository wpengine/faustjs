---
'@faustwp/cli': patch
---

Implements telemetry in the Faust CLI. Telemetry is opt-in by default: if you do not have any preferences, the CLI will ask if you'd like to enroll in Telemetry. Thereafter, you can use the `npx faust faust-telemetry` command to update your preferences. The following information is collected if you enroll:

- Which settings are enabled/disabled in the Faust plugin
- Faust plugin version
- If the WP site is hosted on WP Engine
- If the WP site is multisite
- PHP Version of the WP site
- WP version
- `@faustwp/core` version
- `@faustwp/cli` version
- `@apollo/client` version
- Node version
- `next` version
- If the Node environment is in dev mode (was `npm run dev` ran)
- The command that gets ran (i.e. `npm run dev`, `npm run build`)
