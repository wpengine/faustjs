---
title: "withFaust"
description: "Reference for the withFaust helper function used to merge Next.js configuration with required Faust.js settings."
---

The `withFaust` helper function is used to merge your `next.config.js` config with necessary Faust.js configuration.

## Usage

To use `withFaust`, create a `next.config.js` file in your project root with the following content:

```js title="next.config.js"
const { withFaust } = require("@faustwp/core");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust();
```

If you already have a `next.config.js` file, you can use the first argument of `withFaust` to merge in your existing config.

Take the following example, where we have a custom `next.config.js` handling a rewrite:

```js title="next.config.js"
const { withFaust } = require("@faustwp/core");

const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/about",
				destination: "/",
			},
		];
	},
};

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust(nextConfig);
```

## What `withFaust` changes

`withFaust` keeps your config and adds:

- A redirect that sends preview links to the preview page.
- An `x-using: faust` header, and `poweredByHeader: false`.
- `@faustwp/core` and `@faustwp/blocks` in `transpilePackages`, so Next.js bundles them into your pages. Without this, Turbopack production builds return a 500 error ("NextRouter was not mounted") for pages rendered on demand.

If you don't use `withFaust`, add the packages yourself:

```js title="next.config.js"
module.exports = {
	transpilePackages: ["@faustwp/core", "@faustwp/blocks"],
};
```

## Additional Options

`withFaust` also accepts a second argument for `withFaustConfig`. `withFaustConfig` represented as a TypeScript interface looks like this:

```ts
interface WithFaustConfig {
	// Where preview links will be redirected to.
	previewDestination?: string;
}
```

For example, if you want to change the default preview destination from `/preview` to `/previews`, you can do so by passing the following to `withFaust`:

```js title="next.config.js"
const { withFaust } = require("@faustwp/core");

const nextConfig = {};

const withFaustConfig = {
	previewDestination: "/previews",
};

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust(nextConfig, withFaustConfig);
```

Note:
If you change the `previewDestination` path, do not forget to create an associated `page` with the same name for that destination. Otherwise the framework will redirect to a non existing page and it will show a `404` response.
