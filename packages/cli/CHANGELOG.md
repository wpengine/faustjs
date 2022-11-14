# @faustwp/cli

## 0.1.4

### Patch Changes

- ede0fc4: Fixed a bug where the `NODE_ENV` was not being set properly when `faust start` was ran. Additionally, fixed a bug that halted the `faust start` command from running in some CI/node environments.

## 0.1.3

### Patch Changes

- fbccb4f: Implements telemetry in the Faust CLI. Telemetry is opt-in by default: if you do not have any preferences, the CLI will ask if you'd like to enroll in Telemetry. Thereafter, you can use the `npx faust faust-telemetry` command to update your preferences. The following information is collected if you enroll:

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

## 0.1.2

### Patch Changes

- 4f46f81: Handles .env.production and .env.development in example

## 0.1.1

### Patch Changes

- f1b80a4: Added new command, `generatePossibleTypes`, that enables users to update their project's possible types schema for the Apollo GraphQL Client.
- 401ba91: Excluded unnecessary files in production release (src, config files, etc.)

## 0.1.0

### Minor Changes

- ddbd104: Initial Release
