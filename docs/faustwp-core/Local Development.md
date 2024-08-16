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
- [LocalWP](https://localwp.com/) (v6.1 or higher)

## Setup

First, we'll need a site using Faust that we can work with. If you have an existing site using `@faustwp/core` you \_should\_ be able to use it. If you need a project site to test with, we recommend cloning the `acf.wpgraphql.com` repo, which this guide is based on.

### Link `@faustwp/core`

From within the directory of the project using Faust, run the following command to link the local copy of `@faustwp/core`:

```sh
yarn link "~/path/to/faustjs/packages/faustwp-core"
```

This will create a symlink in the `node_modules` directory of the project to the local copy of `@faustwp/core`.

### Start the `@faustwp/core` development server

From within the `@faustwp/core` directory, run the following command to install dependencies and start the development server:

```sh
npm install
npm run dev
```

Leave this terminal window open while you work on your project.

### Start the project site

From within the directory of the project site, run the following command to install dependencies and start the development server:

```sh
yarn install
yarn dev
```

**_NOTE_**: The `faustjs` repo uses npm for installing dependencies and running scripts, but in order for the project to properly link to Faust for local development with "fast refresh" support, the project needs to use `yarn` instead of `npm`.

## Troubleshooting

- **Issue:** `yarn link` command not working.
  - **Solution:** Ensure the path to `@faustwp/core` is correct and that you have the necessary permissions.
- **Issue:** Development server not starting.
  - **Solution:** Check for any errors in the terminal and ensure all dependencies are installed correctly.
