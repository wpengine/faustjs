# @faustwp/cli

## 1.1.1

### Patch Changes

- 176bc82: Adds reference to parent tsconfig.json and fixes type resolution errors.

## 1.0.1

### Patch Changes

- c79d881: Bump to 1.0.1 since 1.0.0 release already existed in NPM from initial setup

## 1.0.0

### Minor Changes

- 7952ebe: Transitioned to [Semantic Versioning](https://semver.org). There are no breaking changes in this release.

### Patch Changes

- ef92d02: Added `@faustwp/blocks` version to telemetry data.

## 0.2.13

### Patch Changes

- 200bdb8: Add min engines declaration in package.json

## 0.2.12

### Patch Changes

- 02f7f78: Added new command `faust generateGlobalStyles` which adds the connected WordPress site's global stylesheet to the root of your project.

## 0.2.10

### Patch Changes

- c46eac9: Give human readable errors when `faust generatePossibleTypes` fails. Typically due to having "Public Introspection" disabled
- 0ad4567: - Improved error handling for scenarios when [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) is unavailable due to it being deactivated or the WordPress site is unavailable.

## 0.2.7

### Patch Changes

- 02f7bee: Include Platform info in telemetry payload

## 0.2.2

### Patch Changes

- 0111d9c: Fixed issue where the child process for Next.js CLI was preventing the node server from starting up in a Windows environment.
- c545b11: Fixed a bug where the CLI was overriding the NODE_ENV environment variable if it was predefined
- 15603a9: Telemetry events will now be send for any Faust command. Previously, telemetry events were only being sent for the `faust dev` and `faust build` commands.
- 5c15889: Fixed an issue where telemetry data could be incomplete. Now, if the request to get telemetry data from WordPress fails, we will not continue on with the telemetry request.
- c545b11: Added a debug mode by setting the `FAUST_DEBUG` environment variable to either `true` or `1`
- 4dce6dc: Added support for FAUST_SECRET_KEY in addition to the pre-existing FAUSTWP_SECRET_KEY.

## 0.2.0

### Minor Changes

- fa2009f: Added new telemetry commands: `faust telemetry status`, `faust telemetry enable`, & `faust telemetry disable`.
  These new commands replace `faust faust-telemetry`, which previously required additional user interaction.
  Removed `FAUST_NO_INTERACTION` as the CLI no longer requires interaction.

## 0.1.6

### Patch Changes

- 0c03272: Fixes: CLI does not return non zero exit code on unsuccessful build

## 0.1.5

### Patch Changes

- f5c5867: Added new `.env` variable, FAUST_NO_INTERACTION, intended for CI environments.

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
