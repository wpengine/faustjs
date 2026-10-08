# Faust.js Roadmap

This roadmap covers Q4 2026. It replaces the Q4 2025 roadmap, which described a rewrite of Faust.js into framework adapters. That rewrite is no longer planned, and new work builds on the existing packages and APIs.

## Priorities

### 1. Compatibility and reliability

Keep existing Faust.js sites working as WordPress, WPGraphQL, Next.js, Node.js and Apollo Client move forward.

- Security fixes in all packages and the FaustWP plugin.
- Support for new WordPress and WPGraphQL releases, including block schema changes in `@faustwp/blocks`.
- Clear, documented ranges for supported Next.js, React and Apollo Client versions.
- Fixes for confirmed bugs in authentication, previews and redirects.

### 2. Writing data back to WordPress

Faust.js already handles reading content, authentication and previews. Apps that write back to WordPress currently have to build their own server-side credentials and conflict handling. The write path is the main new work for Faust.js this quarter.

All write-path features are additive and opt-in. Existing read, preview and authentication behavior doesn't change.

| Item                                                                          | Status      | Issue                                                    |
| ----------------------------------------------------------------------------- | ----------- | -------------------------------------------------------- |
| Document the write path: mutations, token lifetime, concurrent edits          | Done        | [Guide](https://faustjs.org/docs/how-to/write-data-to-wordpress/), [#2563](https://github.com/wpengine/faustjs/issues/2563) |
| Versioned document store with conflict detection in FaustWP                   | Proposed    | [#2562](https://github.com/wpengine/faustjs/issues/2562) |
| Scoped service user for server-side writes in FaustWP (off by default)        | Proposed    | [#2561](https://github.com/wpengine/faustjs/issues/2561) |
| Framework-agnostic auth package for Node, Astro, SvelteKit and other runtimes | Proposed    | [#2564](https://github.com/wpengine/faustjs/issues/2564) |

The auth package ships alongside `@faustwp/core` first. `@faustwp/core` only moves onto it after it has proven stable.

## Status of previously planned packages

The Q4 2025 roadmap listed `@wpengine/hwp-auth` and `@wpengine/hwp-template-hierarchy` as planned. Neither has been published. Framework-agnostic authentication for Faust.js is tracked in [#2564](https://github.com/wpengine/faustjs/issues/2564).

For guidance on building headless WordPress sites with other frameworks, see the [Headless WordPress Toolkit](https://github.com/wpengine/hwptoolkit).

## Feedback

Comment on the linked issues or start a thread in [Discussions](https://github.com/wpengine/faustjs/discussions).

_Last updated: Oct 7, 2026_
