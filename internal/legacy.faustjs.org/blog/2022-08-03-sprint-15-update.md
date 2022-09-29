---
title: Sprint 15 Update
description: Updates from the teams work on Sprint 15
slug: sprint-15-update
hide_table_of_contents: true
---

Yesterday the team working on Faust finished Sprint 15 and started work on our next Sprint, 16, which we will be in for the next two weeks. The theme of the sprint was to finish porting the post previews feature to the new version of Faust as well as to address as many [GitHub issues](https://github.com/wpengine/faustjs/issues) as we could.

## What we accomplished

Unfortunately we haven't yet finished the new preview feature as complexities of integrating the feature with the new Apollo library slowed the work down more than we would have liked. We should be able to complete it in the coming days but it was not completed as part of the sprint as we would have liked.

We did, however, catch up on our backlog of issues as planned. This included reducing the client bundle size and upgrading to GQty 2.3.0. We hope this work will make life a bit easier for folks currently using Faust in production.

## What's next

Next up we're focusing solely on finishing out "plugin" system for Faust. This is a series of hooks that will allow folks to build on Faust for their own projects. Maybe you want to add in a feature or swap out something we're doing? No problem. Just like WordPress plugins you'll be able to extend Faust to fit your needs and, if you're so inclined, the needs of the community in general.

While the plugin system is our primary goal for these two weeks we're also still finishing up post previews and working to ensure we can get some basic telemetry data on how folks are using the framework. The latter is being done in GA4 but, due to changes in GA4, will require a bit more work for us to be able to implement it. On the positive side this will make analytics even more private due to a proxy that can mask IP address and other data. On the downside, building that proxy will mean more work for the team in the coming days. It will be worth it, however, as it can help us build the features you need in the future.
