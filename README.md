![Faust.js](https://user-images.githubusercontent.com/5306336/152221545-53087444-b3ad-477d-90a9-606785854656.jpg)

<p align="center">
  <a aria-label="@faustwp/core Downloads" href="https://www.npmjs.com/package/@faustwp/core">
    <img alt="" src="https://img.shields.io/npm/dw/@faustwp/core?color=7e5cef&style=for-the-badge&label=@faustwp/core">
  </a>
<!--  -->
  <a aria-label="@faustwp/cli Downloads" href="https://www.npmjs.com/package/@faustwp/cli">
    <img alt="" src="https://img.shields.io/npm/dw/@faustwp/cli?color=7e5cef&style=for-the-badge&label=@faustwp/cli">
  </a>
<!--  -->
  <a aria-label="License" href="https://github.com/wpengine/faustjs/blob/canary/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/@faustjs/core?color=7e5cef&style=for-the-badge">
  </a>
</p>

## Introduction

Faust.js is a toolkit for building Next.js applications for headless WordPress sites. Faust.js provides tooling to reduce the pains of building a headless WordPress site (namely around data fetching, authentication, previews, and SSR/SSG) while offering a pleasant experience for both developers and publishers.

- [Getting started with Next.js](https://faustjs.org/docs/getting-started)

## System Requirements

- Node.js v16.0.0 or newer (v16.8.0 when using Next.js 13 and v18.17 when using Next.js 14).
- MacOS, Windows (including WSL), and Linux are supported.

## Documentation

Visit [https://faustjs.org/docs/](https://faustjs.org/docs/getting-started) to view the full documentation.

### Editing Docs

Docs are MD in [`docs`](docs/). Here are a couple things you should know!

1.  Our Docs support [Github Flavored Markdown](https://github.github.com/gfm/) (GFM).
2.  Images should be stored along side the doc that uses them in an `images/` folder.
3.  Shared Images can be stored in a shared folder @ `docs/images`
4.  [Callouts](https://github.com/lin-stephanie/rehype-callouts?tab=readme-ov-file#rehype-callouts): These are similar to block quotes or an aside but for various warnings, info, pro times, etc.
5.  Code Blocks:

    - Required
      1. Specify a language: ` ```js ` or `` `const inlineCode = [1,2,3];{:js}` ``
         - Commands for a users terminal = `bash`
         - env files = `ini`
         - JavaScript = `js`
         - TypeScript = `ts`
         - GraphQL = `gql`
         - JSON = `json`
         - For a full list see: https://shiki.style/languages
      2. Add [line numbers](https://rehype-pretty.pages.dev/#line-numbers) to any complex code. `ini` and `bash` don't need to show line numbers generally. ` ```js showLineNumbers`
      3. Complete files should have a [file names](https://rehype-pretty.pages.dev/#titles) ` ```js title="pages/_app.js`
    - Optional

      1.  Lines can be [highlighted](https://rehype-pretty.pages.dev/#highlight-lines) in code blocks ` ```js {1,3-5}`. There are a variety of advanced highlighting methods, see: https://rehype-pretty.pages.dev/#highlight-lines
      2.  Lines may be [diffed](https://shiki.style/packages/transformers#transformernotationdiff) in a code block:

			```js
			console.log('hewwo') // [!code --]
			console.log('hello') // [!code ++]
			console.log('goodbye')
			```

## WordPress Plugin (FaustWP)

There are two key parts to Faust.js: the NPM packages and the WordPress plugin. To take full advantage of headless, you will need to install the plugin in addition to the npm packages.

You can download and install FaustWP from the [WordPress Plugin Directory](https://wordpress.org/plugins/faustwp/), or by using the zip linked below.

[📥 Download Latest Version](https://wordpress.org/plugins/faustwp/)

## Community

To chat with other Faust.js users and the headless community as a whole, you can join the [WP Engine Developers Discord](https://discord.gg/J2khkF9XYK).

Additionally, if you have questions or ideas, please share them on [GitHub Discussions](https://github.com/wpengine/faustjs/discussions).

## Contributing

There are many ways to [contribute](/CONTRIBUTING.md) to this project.

- [Discuss open issues](https://github.com/wpengine/faustjs/issues) to help define the future of the project.
- [Submit bugs](https://github.com/wpengine/faustjs/issues) and help us verify fixes as they are checked in.
- Review and discuss the [source code changes](https://github.com/wpengine/faustjs/pulls).
- [Contribute bug fixes](/CONTRIBUTING.md)

### Contributor License Agreement

All external contributors to WP Engine products must have a signed Contributor License Agreement (CLA) in place before the contribution may be accepted into any WP Engine codebase.

1. [Submit your name and email](https://wpeng.in/cla/)
2. 📝 Sign the CLA emailed to you
3. 📥 Receive copy of signed CLA

❤️ Thank you for helping us fulfill our legal obligations in order to continue empowering builders through headless WordPress.
