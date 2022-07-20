---
title: Sprint 14 Update
description: Updates from the teams work on Sprint 14
slug: sprint-14-update
hide_table_of_contents: true
---

Yesterday, July 19th, the team completed Sprint 14, which is simply our 14th [sprint](https://www.educba.com/what-is-agile-sprint/) of the year. This was one of more productive sprints, in terms of implementation, so far this year. We managed to release a new version of both the Faust.js library as well as the Faust WordPress plugin, we welcomed two new developers to the team and we worked hard to implement a way to help us better understand how folks are using the framework. Here's how it all breaks down:

## Faust.js 0.15.7 and Faust WP 0.7.10

The Faust WordPress plugin was updated to version 0.7.10 last week and all Faust JavaScript libraries were updated to version 0.15.7. These new versions didn't bring about any new features but they did solve some issues folks were seeing as well as updated some of the dependencies Faust relies on. You can see a full list of all the changes we made in our [release notes](https://github.com/wpengine/faustjs/releases).

## Welcome new developers

In addition to new releases, our team also welcomed two new developers to the team bringing our total to 5 full-time developers focused solely on Faust. You'll see their contributions in our [GitHub repo](https://github.com/wpengine/faustjs/) and they will help us bring the next evolution of Faust into your hands as quickly as possible.

We're not done here, though. We still have one more position open on our team for a staff developer. If you're interested in helping take Faust to the next level, [apply now](https://wpengine.wd1.myworkdayjobs.com/en-US/WP_Engine/job/Software-Engineer-IV--ATLAS---Themes-_JR100226) and let's talk.

## New telemetry in Faust.js

The big goal of Faust.js was in implementing some basic telemetry into Faust so that our teams and stakeholders have some measure on how the product is actually being used. Note that this telemetry, while code complete, has not launched in a release yet.

To implement the telemetry we're using [Google Analytics](https://marketingplatform.google.com/about/analytics/), a common analytics partner in WP Engine products, to collect data on version information and other build parameters solely from the JavaScript builds completed with Faust. **All analytics are opt-in only** so new users, once launched, will see a prompt asking you if you're willing to login. This can safely be bypassed, for those interested in doing so, without sending us any data. While we'd love to see you participate in helping us collect build data, and hope you'll do so, failing to opt-in means nothing at all will be transmitted to Google or elsewhere.

You can expect to see this in a new release in the coming months as we first finish a comprehensive privacy policy for the feature.

## What's next

In Sprint 15, which started yesterday, the team is focusing on implementing content previews in the next version of Faust as well as reducing some technical debt that has lead to issues on our GitHub repo. Expect to see a new, faster, release as a result at some point in the next two weeks.
