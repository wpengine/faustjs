---
title: Sprint 22 Update
description: Updates from the team's work on Sprint 22
slug: sprint-22-update
hide_table_of_contents: true
---

Progress is iterative, and that has definitely been the theme of our past two weeks as we build Faust. Rather than pushing forward on a host of new features we're not sure if you even need we've been stepping back and using our support as part of [WP Engine](https://wpengine.com) to meet with agency partners already building on [Atlas](https://wpengine.com/atlas/) and headless in general. We've also been polishing what we have since our public release of new Faust and planning what we'll be working on in 2023.

<!--truncate-->

## Next 13 support

One request we're hearing frequently is for [Next 13](https://nextjs.org/blog/next-13) support. We've spent some time these past two weeks digging into it and what it means for Faust and we're confident in saying you should be able to use Next 13 without issue and we will be officially updating Faust's dependencies to it after the new year.

If you are trying to upgrade to Next 13 yourself we do recommend turning off it's alpha and beta features, particularly the `app` directory, to avoid breaking your Faust app. We will be adding support for these newer features over time as they are made stable in Next and as they are appropriate for use with Faust and WordPress.

## A proper project scaffold

We've also finished the code on a proper project scaffold this sprint. This is like our Blueprint starters except stripped down to the bare minimum to get you started on your Faust project as quickly as possible. We'll have this available shortly for all y'all to get started with it in JavaScript with a TypeScript version to follow in a few weeks.

## Working with Gutenberg

Finally, we've spent considerable time investigation how Faust should work with Gutenberg and the WordPress Block Editor and we have some ideas I think you'll be excited about. The first step to make this happen is dealing with how WordPress stores block information and we're developing a 2nd plugin, an add-on to [WPGraphQL](https://www.wpgraphql.com) that takes a server-side approach to deconstructing block data into a proper data structure that could be queried as any other. Over time this will allow us to build a robust API and block library that will allow blocks to become first-class citizens in headless as they are in WordPress. Imagine writing your front-end component once and it just working as a block so your site editors can just use it. That's what we're working towards and we're excited to say we'll be able to start showing off that work in the new year.

## Coming up next

For the next two weeks we'll be going head down starting TypeScript work, finishing out our WPGraphQL extension for blocks and more. Our backlog is pretty full for the moment and gives us a lot of room to take Faust even further in the new year and we're looking forward to seeing what that will enable you to build.
