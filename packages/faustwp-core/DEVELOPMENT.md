# Contributing

There are many ways to [contribute](../../CONTRIBUTING.md) to this project.

- [Discuss open issues](https://github.com/faustjs/issues) to help define the future of the project.
- [Submit bugs](https://github.com/wpengine/faustjs/issues) and help us verify fixes as they are checked in.
- Review and discuss the [source code changes](https://github.com/wpengine/faustjs/pulls).
- [Contribute bug fixes](../../CONTRIBUTING.md)

## Project Structure

- `/packages/faustwp-core` - Faust
- `/packages/faustwp-core/components` - Faust Components
- `/packages/faustwp-core/queries` - Faust Queries

### NPM Packages

NPM packages are managed from the project root using [Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). To get started, run:

1. `npm install`
2. `npm run dev`

The local copy of each package is automatically symlinked in `node_modules` when running `npm install` from the project root. Likewise, each package is automatically built when running `npm run dev`.

When switching git branch, run `npm run clean` from the root and then re-run `npm run dev`.

### 1. Setup

1. Create the following `.env.local` in the `packages/faustwp-core` root and replace the ``NEXT_PUBLIC_GRAPHQL_ENDPOINT`` with your own.

```
# GraphQL Endpoint
NEXT_PUBLIC_WORDPRESS_URL=http://headless.local
```

## Git Workflows

We have three notable branches:

- `canary` - This branch has the latest changes
- `main` - This branch is used to deploy changes to [faustjs.org](https://faustjs.org)
- `site-dev` - This branch is used to deploy to the staging site

### Code Changes/Feature Workflow

We use the [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). The workflow for a typical code change looks like:

- Create a new branch for the feature
- Make changes to the code
- Use `npm run changeset` to create a changeset describing any package or plugin updates
- Commit your changes
- Open a pull request to the `canary` branch
- Squash and Merge the pull request into the `canary` branch

**Note**: We use Squash and Merge when merging pull requests into the `canary` branch.

### Staging Site Deployment

When your feature branch includes changes to the documentation website, it's helpful to include a live preview link in the PR description. The [staging site](https://hcixzyt38dn5ak04xxcqc36lf.js.wpenginepowered.com/) is used for this purpose. You can deploy your changes to the staging site using the following steps:

- Checkout and switch to the `site-dev` branch.
- Merge your feature branch into `site-dev`.
- Push your merge commit to `site-dev`.
- Within about 10 minutes, the docs changes from your feature branch should be visible on the [staging site](https://hcixzyt38dn5ak04xxcqc36lf.js.wpenginepowered.com/).

### Prod Site Deployment

The docs on faustjs.org are automatically built on pushes to `main`. Updating the docs on `main` will update faustjs.org within 10 minutes.

After a successful release, a PR from `canary` to `main` is automatically created. Review and merge this PR to update faustjs.org.

**Important**: Be sure to use the "Create a merge commit" option, and not "Squash and merge", as this can lead to [merge conflicts](https://medium.com/@guilhermerios/the-agony-and-the-ecstasy-of-git-squash-7f91c8da20af).

## Deployment

Developers with full GitHub repository access can create public releases. We use [Changesets](https://github.com/atlassian/changesets) to automate the versioning and deployment process for all of our packages and plugins.

### Versioning

When you are ready to release, you should first create the new package and plugin versions.

1. Go to [pull requests](https://github.com/wpengine/faustjs/pulls), and view the "Version Packages" PR.
2. Review the PR:
  - [ ] Changelog entries were created in all updated packages or plugins.
  - [ ] Version numbers were appropriately bumped in the relevant package.json files.
  - [ ] All `.changeset/*.md` files were removed.
  - [ ] Version number updated in the main plugin file and readme.txt (Plugin versioning only)
  - [ ] The plugin's readme.txt changelog has been updated with the latest 3 versions (Plugin versioning only)
3. Approve, then "Squash and merge" the "Version Packages" PR into `canary`.

### Publishing the @faustwp packages

The @faustwp packages are automatically published to NPM through a GitHub action once the "Version Packages" PR is merged.

### Publishing the FaustWP plugin

Once the "Version Packages" PR is merged, create a new release on GitHub with a tag of `plugin/faustwp/v[version]`. This will kick off our GitHub Action to deploy the `faustwp` plugin to WordPress.org.

Once deployed, the updated packages and plugin will be visible here:

- https://www.npmjs.com/package/@faustwp/core
- https://www.npmjs.com/package/@faustwp/cli
- https://plugins.trac.wordpress.org/browser/faustwp/tags

### Update the docs

After a release, remember to update the docs using the [Prod Site Deployment](#prod-site-deployment) process outlined above.
