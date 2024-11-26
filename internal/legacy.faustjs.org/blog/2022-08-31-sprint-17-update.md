---
title: Sprint 17 Update
description: Updates from the team's work on Sprint 17
slug: sprint-17-update
hide_table_of_contents: true
---

We finished Sprint 17 yesterday, our 17th 2-week Sprint of the year. Our current focus has been two-fold: first, to release a new version of Faust using Apollo as our GraphQL library and, second, to build a plan for how to best integrate Gutenberg (the block editor) into a headless site with the minimum amount of developer friction. As far as progress on both those endeavors is concerned, the Sprint was a success.

## What we accomplished

One of our more important features in Faust has been the support of Sitemaps as implemented by plugins such as [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) and others. While we've had the feature for a while, Next.js 12.2 [changed their middleware implementation rather significantly](https://nextjs.org/blog/next-12-2) leaving the feature broken for our users. We now have a fix in place that avoids using Next's middleware and hope to have it in your hands in the coming weeks.

In addition to updating our sitemap feature, the team has also been learning Gutenberg development to better understand WordPress development as a whole. Most of our backgrounds are either in classic WordPress or in JavaScript, so Gutenberg, at least at the level we need to understand it, has been a learning experience for everyone this quarter. With the conclusion of Sprint 17 we feel we have enough experience with it to finally start looking at how we can use it to make headless development better. For example, what if you could re-use your components in both the editor and on your headless front-end? There are many questions and many avenues to pursue and, over the coming weeks, we'll be putting together a plan to do so. To me, personally, this is one of the most exciting possibilities for headless WordPress. Unlocking the potential of Gutenberg for headless sites will all for use and re-use of content on a scale that just isn't possible in classic WordPress and the potential is amazing.

Finally, we also worked to scrub a number of bugs in the Sprint including upgrading dependencies and plenty of others. Look for the results in our next release coming soon.

## What's next

Our next Sprint will be focused on two things. First, better content previews for the next version of Faust. The new version will enable a whole new ability to easily develop headless WordPress sites, including its own plugin system and the ability to utilize a template system very similar to WordPress' own [template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/). Now we need to update our content previews to take advantage of it.

Second, we're moving beyond learning Gutenberg development ourselves and will be spending time this upcoming Sprint developing a high-level plan for how to best utilize it in headless WordPress development. Expect to see the results of these plans starting in the 4th quarter of 2022.

Finally, we'll be focusing heavily on documentation and other tasks to make sure you'll be able to hit the ground running when we re-release Faust at the end of September. We can't wait to show you what we've been working on here!
