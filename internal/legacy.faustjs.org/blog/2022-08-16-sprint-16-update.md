---
title: Sprint 16 Update
description: Updates from the teams work on Sprint 16
slug: sprint-16-update
hide_table_of_contents: true
---

Hello folks! I’m Terri, one of the new software engineers working on the team developing Faust. I’ll be supplying the update on the team’s progress the last two weeks on sprint 16, as well as a quick peek at what we're working on for the remainder of August.

## What we accomplished

Yesterday, August 16th, the plugin system code was completed for the new version of Faust. The goal of this new plugin system is to allow developers to provide easy-to-implement solutions for themselves and other users. A plugin for this new version of Faust is a simple class with a constructor for options, and an “apply” method. This method has a function as an argument called `callHook`, which is a callback function to apply logic to certain types of hooks. For example, a developer may want to alter what data is fetched in the seed query, or what templates get resolved in the template resolver. Each of these actions now have a corresponding “hook” to which custom functionality can be applied.

In addition to this, plugins in the new system now have `@wordpress/hooks` behind an experimental flag, as well as tests that ensure that a developer’s experimental plugins have their apply methods called while those that don’t have an apply method fail silently when specified in the `experimentalPlugins` config property. Testing also now ensures that the possible lack of the `experimentalPlugins` property does not introduce any adverse effects, too, allowing developers to tinker with building plugins with less implementation.

Beyond the plugin system for the new version of Faust, we also completed an architecture document for a service to handle GA4’s new requirements with telemetry, ensuring that the team has a plan for keeping data anonymous and building a reliable reporting system. We implemented post previews and authorization for previews, too, so folks can examine posts while in the block editor.

## What's next

The team is now closing in on a fix for the breaking changes introduced when Next.js took middleware out of beta. The handleSitemapRequests function used in conjunction with Next.js 12.2 will once again allow developers to easily proxy their WordPress sitemap to their headless frontend once these code changes are approved and merged.

In Sprint 17, we are also working on planning out our approach for implementing support for Next.js file-based pages. Our current data fetching conventions and abstractions work well inside the template hierarchy system, but we want to support Next.js based pages too, while maintaining the same level of functionality. Having this flexibility will help developers create pages outside of the template hierarchy without needing to create a page for every route, putting a wider range of options on the table.