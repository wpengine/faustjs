# Previews in Headless WordPress

**NOTE: This is prerelease software. As we work towards our first release, we may introduce breaking changes.**

In this guide, we'll walk through how to configure a Next.js site for previews.

## WPE Headless Plugin

In order to enable previews in WordPress, you'll first need to install the [wpe-headless plugin](../../plugins).

The plugin enables an OAuth flow for users to authenticate with WordPress and receive an access token which is used for subsequent API calls (i.e. GQL/REST).

In addition, the plugin will rewrite URLs in WordPress so that when a user clicks view/preview on a post, they will be taken to the frontend rather than WP.

### Plugin Settings

Go to Settings->Headless to view the plugin's settings page:

![Headless Plugin Menu](./headless-settings.jpg)

There are 2 settings that assist in previews. The first one is read-only. It gives you an API secret key that you need to use on your backend for your frontend.

The second setting is the location of your frontend. You'll need to put the base URL (i.e. http://localhost:3000).

![Headless Plugin Auth Settings](./headless-settings-auth.jpg)

## @wpengine/headless

The `@wpengine/headless` package provides helpers to get previews working in a React application.

Install the npm package via:

```
npm i @wpengine/headless
```

The package contains an auth handler to get an access token for a user when trying to view a preview/draft post as well as React hooks to pull post(s).

### Auth Handler
