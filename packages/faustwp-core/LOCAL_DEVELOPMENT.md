# Local Development

**_NOTE_**: This guide is a WIP and may be incomplete.

This guide will walk you through setting up a local development environment for `@faustwp/core`.

## Table of Contents

1. [Requirements](#requirements)
2. [Setup](#setup)

- [Link `@faustwp/core`](#link-faustwp-core)
- [Start the `@faustwp/core` development server](#start-the-faustwp-core-development-server)
- [Start the project site](#start-the-project-site)

3. [Troubleshooting](#troubleshooting)

## Requirements

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (v4.4 or higher)
- [Git](https://git-scm.com/) (v2.33 or higher)

> [!NOTE]
> We will be using both `yarn` and `npm` in this guide.
> The `faustjs` repo uses `npm` for installing dependencies and running scripts.
> The project using faust will use `yarn` to create a link to Faust for local development with "fast refresh" support.

## Project Site Setup

First, we'll need a site using Faust that we can work with. If you have an existing site using `@faustwp/core` you \_should\_ be able to use it. If you need a project site to test with, we recommend cloning the `acf.wpgraphql.com` repo, which this guide is based on.

> [!NOTE]
> If you clone `acf.wpgraphql.com` to use as an example, you will need to copy the `.env.local.example` file into `.env.local`

### Link `@faustwp/core`

From within the directory of the project using Faust (i.e. your site's directory, not the directory where you cloned Faust), run the following command to check the version of yarn being used:

```shell
yarn --version
```

If not using yarn v4.4 or higher, you will need to upgrade yarn to v4.4 or higher:

```shell
yarn set version berry
```

With Yarn v4.4 or higher, you can now link the local copy of `@faustwp/cli` and `@faustwp/core`:

```sh
yarn link "~/path/to/faustjs/packages/faustwp-cli"
yarn link "~/path/to/faustjs/packages/faustwp-core"
```

This will create a symlink in the `node_modules` directory of the project to the local copy of `@faustwp/cli` and `@faustwp/core`.

### Start the `@faustwp/core` development server

From within the directory where the Faust repo was cloned, run the following command to install dependencies, build the code and start the development server for `@faustwp/core`:

```sh
npm install --workspace=@faustwp/core
npm run build --workspace=@faustwp/core
npm run dev --workspace=@faustwp/core
```

Leave this terminal window open while you work on your project in another terminal window.

### Start the project site

From within the directory of the project site, run the following command to install dependencies and start the development server:

```sh
yarn install
yarn dev
```

You should be able to view the local site running at `localhost:3000` and see output in the terminal.

### Local Development of Faust

Now that we have both the project site running in `dev` mode and `@faustwp/core` running in `dev` mode, we can make changes to `@faustwp/core` and see them reflected in the project site.

In VS Code or your IDE of choice, open the `faustjs/packages/faustwp-core/src/getTemplate.ts` and add the following to the top of the `getPossibleTemplates` function:

```ts
console.log(`Hello from Faust!`);
```

Save the file, and you should see the message logged immediately in the terminal running your project site in dev mode.

You should now be able to work on Faust locally and see changes reflected in your project site.

## Clean Up

When you are done working on your project site, you can unlink the local copy of `@faustwp/core` and `@faustwp/cli`:

```sh
yarn unlink @faustwp/core
yarn unlink @faustwp/cli
```

This will remove the symlink from the `node_modules` directory of the project and cleanup the resolutions in the package.json.

## Troubleshooting

- **Issue:** `yarn link` command not working.
  - **Solution:** Ensure the path to `@faustwp/core` and `@faustwp/cli` are correct and that you have the necessary permissions.
- **Issue:** Development server not starting.
  - **Solution:** Check for any errors in the terminal and ensure all dependencies are installed correctly.
- **Issue:** Build errors when running `npm install`
  - **Solution:** Make sure all `node_modules` directories within the repo have been removed before running `npm install`.
