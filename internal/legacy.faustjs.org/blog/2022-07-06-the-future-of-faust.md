---
title: The Future of Faust.js
description: An update on Faust.js, where it is and where it is going
slug: the-future-of-faust
hide_table_of_contents: true
---

We launched this blog 7 months ago with a goal of keeping you informed of what is going on in the development of Faust.js as well as to help you get started using the framework in your own projects. To date, we simply have not prioritized keeping up here on the blog and it is time for that to change.

<!--truncate-->

Today we want to talk about where Faust.js is and where we're working on taking it in the future. It will be the first of many regular posts designed to tell the story of Faust.js and how it affects developers of all backgrounds.

## Where Faust.js is Today

First and foremost, the development of Faust.js is alive and well. When the last post was written in December we were a rather unorthodox team of two engineers working on understanding what Faust.js should be.

Today the Faust.js team, known internally as Team Merlin, is made of of five engineers and an engineering manager and [we're still looking for one more staff/lead engineer to join our team](https://wpengine.wd1.myworkdayjobs.com/en-US/WP_Engine/job/Software-Engineer-IV--ATLAS---Themes-_JR100226).

While we've expanded, we've moved much of our development process out of GitHub projects and into company tools that allow us to be more in tune with the needs of the organization and [Atlas](https://wpengine.com/atlas/) as well as allows us to more easily communicate the story of Faust.js to stakeholders throughout the company.

Today we're revisiting this blog primarily as a way to update you on what we're doing now that we're currently not working in public. From this point forward we'll be updating the blog at least once every two weeks with the current accomplishments and next steps on our journey to ensure Faust.js is the leading framework for folks looking to develop headless sites with WordPress.

## Where Faust.js is Going

As [WP Engine](https://wpengine.com) has made a significant investment in the future of Faust.js by increasing the team working on it, it's time to talk to where we're currently spending our time.

When Faust.js was first conceived a decision was made to go with [GQty](https://gqty.dev) as our data library as we thought it would be the simplest way for users to pull data from WordPress using [WPGraphQL](https://www.wpgraphql.com). While we largely were able to prove it was indeed simple, that simplicity came with complications. GQty proved a difficult choice for users to scale with as it over-abstracted enough of the data layer that modifying how a user was getting data from WordPress quickly became a difficult process.

Today we're working on removing the limits imposed by choosing GQty by replacing it with the popular [Apollo library](https://www.apollographql.com). This will allow users to get what they need from WordPress in whatever way they need it. Users won't be constrained on the queries they run and will be able to more easily modify a default query to fit any use case imaginable. You can expect to see our work on this feature available in the 3rd quarter of 2022.

As part of replacing GQty with Apollo, another shift in Faust.js since our last writing is that we've realized our target audience is not so much JavaScript developers forced to use WordPress but is, in fact, WordPress developers pivoting to headless sites. While the difference might sound trivial, the shift comes with a change of expectations that lead to numerous features in development. For instance, in the 3rd quarter of 2022 we also hope to release a template hierarchy feature that utilizes WordPress' core routing system, popularly known as [permalinks](https://wordpress.org/support/article/using-permalinks/), to power a developer experience that better utilizes the existing development skills of WordPress developers and agencies.

While our audience might not be what we originally thought it was, that isn't to say we're not working on cutting edge features for JavaScript developers as well. From the ability to share components between your front end and WordPress' Block Editor to authentication and even advanced ways to handle use cases such as A/B testing and more there is a lot planned in our backlog and we can't wait to start rolling it out to you over the coming months.

## Check Back Often For Updates From Our Latest Sprint

Faust.js has a bright future and we look forward to sharing it with you. Check back here roughly every two weeks for news on where we're at and what we're working on and, as always, you can ask the team questions in our [GitHub issues](https://github.com/wpengine/faustjs) or on [our Discord server](https://developers.wpengine.com). We're looking forward to powering your project.
