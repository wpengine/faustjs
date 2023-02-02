---
title: Sprint 25 Update
description: Updates from the team's work on Sprint 25
slug: sprint-25-update
authors:
  - name: Chris Wiegman
    title: Engineering Manager
    url: https://github.com/ChrisWiegman
    image_url: https://avatars.githubusercontent.com/u/394675?v=4
hide_table_of_contents: true
---

Sprint 25 was a really productive one for the Faust.js team. We took a break from direct work on the codebase and made it a Faust.js hackathon with an emphasis on exploring features for the future of Faust.

<!--truncate-->

While we were heads down on ideas, though, we still managed to release our final bug fix updates of the year. You can find the details of those releases on [our Releases page on GitHub](https://github.com/wpengine/faustjs/releases). Our annual holiday code freeze started on 21 Dec and goes through the beginning of January so that will be our last release of 2022.

As for our hackathon projects, each team member took a deep dive into something important to them that, we hope, can turn into a useful feature or service in 2023. Here's a breakdown of what we're looking at.

## Astro.js Support

One of the questions we get a lot revolves around how folks can build headless WordPress without the Next.js base that Faust.js runs on. To answer this we took a deep dive at seeing what it would take to get Faust.js working with [Astro.js](https://astro.js.org) in lieu of Next. Astro is an interesting base because it is very light-weight and would allow developers to build their components not just in React, but in a host of frameworks including Vue, Svelte and others.

While official Astro support isn't something we're going to be working on immediately the project does leave me feeling confident to say there is a definite possibility we'll be able to support these other frameworks in the future. In the meantime, it has also given us plenty of material to allow us to better educate and help folks who prefer frameworks other than Next.js and React. It's an exciting place to be, though, and we really look forward to seeing what we can do with it all later down the line.

## A Faust.js Playground

The second project we looked at was a better way to play with Faust.js before you make the decision as to whether it's right for your project. We truly believe it is the best framework for any WordPress project and that, once you do try it, you'll agree. To make that a bit easier we took a deep dive into what it will take to create a Faust.js playground similar to the [WordPress.org playground announced last week](https://developer.wordpress.org/playground/).

While implementation is going to require a bit of heavy lifting on our part, the project as a whole exposed a real need for such a tool as we look to grow Faust.js and as we try to help users learn about its full capabilities. It's something that is very much on our roadmap down the road.

## Improved Data on our Docs and More

Next we wanted to look at how we can improve our docs and Faust.js as a whole. With a smaller user base we don't yet have a huge backlog of requests so instead we're trying to learn what we can about how people are using what we've already launched. This project involved adding analytics to [faustjs.org](https://faustjs.org) and starting to look at what data we have and what we need to answer key questions about how y'all are using the product. Our goal here is to use these insights to improve our documentation first as well as the product itself in order to make using Faust.js that much easier for everyone.

## Headless WordPress Admin Bar

The first three projects I've talked about are more long-term plans, in most cases. That said, we've had two projects from this sprint that we'll be working with immediately to make Faust.js even more useful.

The first of these is a new Admin Bar similar to what users had available in traditional WordPress installations. This tool will allow users logged into the WordPress Dashboard to easily see, edit and debug the front-end of their site without as many external tools. Over the next quarter we look forward to building out the first iteration of this to empower publishers to really become comfortable with their headless WordPress sites. After that we want to use the admin bar as a launch point for plugins that will show you everything from the build status of your page to debugging information on GraphQL and more all while giving everyone shortcuts to tools such as cache and build pipelines to help fix issues when they do pop up.

## SEO and Plugin support (WP_Head)

A common request, and pain point, of headless WordPress is that it is more difficult to implement features traditional WordPress sites get "for free." One of these is the deep integration with plugins such as Yoast SEO and others that output information to the header of your site. From OpenGraph tags to Twitter tags and more, you'll be able to implement these as easily in your headless WordPress site as you did in your traditional WordPress site through a component that replicates the functionality of [wp_head()](https://developer.wordpress.org/reference/functions/wp_head/) on your WordPress front-end.

This component will give you easy access to SEO, server and analytics headers and so much more all easily implemented without the need for custom components. We're starting work on this one now and how to have it available for all in the coming months.

## Thank you for 2022 and we can't wait for 2023

Finally, I just wanted to say thank you to everyone who has supported the Faust.js team in 2022 by either using our work, providing feedback or just giving us the encouragement to push through in building the best and most complete framework for headless WordPress development. We can't wait to show you what all we've been working on for 2023!
