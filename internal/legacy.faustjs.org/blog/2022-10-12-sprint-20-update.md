---
title: Sprint 20 Update
description: Updates from the team's work on Sprint 20
slug: sprint-20-update
hide_table_of_contents: true
---

It's alive!

After a lot of work we're happy to announce that the new code for Faust is available on npm. You can find the core package [here](https://www.npmjs.com/package/@faustwp/core) and our new CLI package [here](https://www.npmjs.com/package/@faustwp/cli).

<!--truncate-->

While these are ready to use, please note we're putting the final polish on an updated documentation site so most of it, for now, is very much for those of you who really like to fiddle.

Also note that this is a new npm organization. This means that your existing code will not auto-update. This new code is a major departure from how we had built Faust and, as a result, it will take some work to migrate your existing implementations.

## What we accomplished

This past sprint was all about getting the new version of Faust online. Until two weeks ago we had been engaged in a project to rename the framework but that was scrapped, for a few reasons, at the last minute leaving us scrambling a bit to launch the code with the Faust brand in such a way as to not risk anyone's site who might be using "*" or similar in their package.json.

So what does new Faust have that makes it so different?

First, it's built using [Apollo](https://www.apollographql.com) instead of GQty. This makes the whole project much more scalable and suitable for larger sites but also requires a lot of your existing Faust code to require migration to the new style which uses a different syntax and whole methodology for delivering your data.

Next, Faust now makes all the issues we saw in trying to figure out routing between WordPress and Next.js much easier. We've even added a Next version of the [WordPress template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/) which makes creating the right template as simple as creating a single JavaScript file.

Of course, if the theme of a switch to Apollo is scalability, we didn't want to just stop here. Faust now has a plugin system allowing you to build on top of Faust like you might have done with WordPress or any other modern system.

Finally, Faust still has all the major features, including authentication and content previews, that you've come to rely on. Now they're all just more robust and more capable of handling the requirements of any WordPress site, even the most complicated sites.

What we haven't finished yet, as I mentioned above, is all the documentation. Expect to see new and updated documentation available here in the coming weeks.

## What's next

Now that the code is live we're going to spend a sprint or more focusing on documentation and cleanup. Like any software product, Faust has been thoroughly tested but a larger user base will surely find bugs and we'll be watching for them and ready to fix them.

Once we have our documentation in a better place we'll be pivoting to better supporting Gutenberg and the Block Editor. Imagine a whole block library built in and for headless. That's what we're working on for our next major feature. You'll be able to use the full power of the Block Editor in the WordPress Dashboard as well as be able to import existing front-end components as new blocks easily with only minimal conversion. It's going to be a huge gamechanger for headless WordPress and we can't wait to show it to you!
