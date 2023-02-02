---
title: Sprint 22 Update
description: Updates from the team's work on Sprint 22
slug: sprint-22-update
authors:
  - name: Teresa Gobble
    title: Associate Software Engineer
    url: https://github.com/TeresaGobble
    image_url: https://avatars.githubusercontent.com/u/50935135?v=4
hide_table_of_contents: true
---

With the end of Sprint 22, our team is proud to officially announce the re-release of Faust.js, WP Engine’s framework for building headless WordPress sites!

During this sprint, we launched the rewritten Faust documentation to work with the new version of Faust, which includes a handy [getting started](https://faustjs.org/docs/getting-started) guide, as well as updated references and [examples](https://faustjs.org/docs/next/guides/project-walkthrough). We are so excited for folks to go check out new docs and really dig into these new features, and plan to roll out several new documents in the coming weeks.

<!--truncate-->

## New documentation

First off, for those jumping right into new Faust, check out these two documents in particular that were just launched on our new site, which guide you through the process and get you started with an example project:

* [Getting Started](https://faustjs.org/docs/getting-started)
* [Example Project Walkthrough](https://faustjs.org/docs/next/guides/project-walkthrough)

For those who have been using the new version for a while, we're confident that this new document launch will make working with Faust even easier, and invite any feedback you may have for us on our [Discord](https://discord.gg/J2khkF9XYK) hub!

## Continued support for the old version of Faust

We want to be clear that folks using the old version of Faust will not see an interruption to their sites this year with the new version's launch. Find the legacy site [here](https://legacy.faustjs.org/) to review documentation for the old version of Faust, and rest assured that old Faust.js will continue to be supported as long as needed in 2022 with security and other fixes.

Additionally, it's important to note that the new Faust is a separate “package” so folks won’t inadvertently break their sites. This means that developers will have to explicitly update their project dependencies to use new Faust!

## Blueprints

We really wanted to showcase how Faust.js contains all the features of old Faust.js, but with a new foundation designed for scalability and flexibility- and the [Atlas Portfolio Blueprint](https://github.com/wpengine/atlas-blueprint-portfolio/pull/96) is our showstopper from this sprint. It is one of the first migrated projects from old Faust (GQty) to new Faust (Apollo), and a migration guide for it is on the docket for the next sprint to help make the process of migrating from old to new Faust easier.

## New users

New Faust’s first known user is live: https://www.wpgraphql.com/. Thank you, Jason Bahl for your support through the process of making sure Faust is the right tool for our users!

If you're currently using new Faust for your site, please don't hesitate to [drop a link to it.](https://discord.gg/J2khkF9XYK) Our team loves seeing new Faust out in the wild!

## Coming up next

We have a new Scaffold Blueprint in the works, which will be created to allow experienced developers to easily start a new project using a complete tool set and all best practices. This will replace Atlas' “basic” Blueprint, based on research indicating that folks want a much less opinionated starting point once they know what they are doing. Next sprint, the team also plans on digging deeper into the latest version of Next.js, to better understand what v13 changes we can incorporate into future Faust features. Lastly, keep an eye out for more migration documentation as we continue to improve our site resources.
