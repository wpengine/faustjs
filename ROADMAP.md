# Faust.js Roadmap

Q4 2026. New work builds on the existing packages; the Q4 2025 plan to rewrite Faust.js into framework adapters is no longer planned.

## 1. WordPress as your app's data store

When WordPress is all you have, FaustWP should give you a quick place to store app data from any frontend, without lost writes. Discussion: [#2679](https://github.com/wpengine/faustjs/issues/2679).

| Item                                     | Status           | Links                                                                                                            |
| ---------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| Direction and first-release scope        | Under discussion | [#2679](https://github.com/wpengine/faustjs/issues/2679)                                                         |
| Versioned document store                 | Prototype        | [#2562](https://github.com/wpengine/faustjs/issues/2562), [#2674](https://github.com/wpengine/faustjs/pull/2674) |
| Connect with an Application Password     | In progress      | [#2678](https://github.com/wpengine/faustjs/issues/2678), [#2676](https://github.com/wpengine/faustjs/pull/2676) |
| Write-path and server-side writes guides | Done             | [Guide](https://faustjs.org/docs/how-to/write-data-to-wordpress/)                                                |

## 2. Compatibility and reliability

Security fixes, new WordPress, WPGraphQL, Next.js and Node.js releases, and confirmed bugs.

| Item                                          | Status    | Links                                                                                                                          |
| --------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Require Node.js 22 or newer in the next major | Announced | [#2658](https://github.com/wpengine/faustjs/issues/2658), [announcement](https://github.com/wpengine/faustjs/discussions/2672) |
| Support Apollo Client 4                       | Backlog   | [#2192](https://github.com/wpengine/faustjs/issues/2192)                                                                       |

## Decided against

- A Faust.js auth package ([#2564](https://github.com/wpengine/faustjs/issues/2564)). See the Headless WordPress Toolkit's [authentication guide](https://github.com/wpengine/hwptoolkit/blob/main/docs/explanation/headless-authentication/index.md).
- A FaustWP service key ([#2561](https://github.com/wpengine/faustjs/issues/2561)). Use Application Passwords instead.

Feedback is welcome on the linked issues or in [Discussions](https://github.com/wpengine/faustjs/discussions).

_Last updated: Oct 20, 2026_
