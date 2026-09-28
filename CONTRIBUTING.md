> [!IMPORTANT]
> Faust.js is in maintenance mode. We accept security fixes, compatibility updates, and critical bug fixes. We don't accept new features. See [SUPPORT.md](SUPPORT.md) for details, and report security issues as described in [SECURITY.md](SECURITY.md), not in public issues.

# Instructions For Logging Issues

## 1. Search For Duplicates

[Search the existing issues](https://github.com/wpengine/faustjs/search?type=Issues) before logging a new one.

Some search tips:

- _Don't_ restrict your search to only open issues. An issue with a title similar to yours may have been closed as a duplicate of one with a less-findable title.
- Search for the title of the issue you're about to log. This sounds obvious but 80% of the time this is sufficient to find a duplicate when one exists.
- Read more than the first page of results. Many bugs here use the same words so relevancy sorting is not particularly strong.
- If you have a crash, search for the first few topmost function names shown in the call stack.

## 2. Did You Find A Bug?

When logging a bug, please be sure to include the following:

- What version of the package/plugin are you using
- If at all possible, an _isolated_ way to reproduce the behavior
- The behavior you expect to see, and the actual behavior

## 3. Do You Have A Suggestion?

Faust.js doesn't accept feature requests. Share ideas for headless WordPress with the [Headless WordPress Toolkit](https://github.com/wpengine/hwptoolkit) instead.

# Instructions For Contributing Code

## What You'll Need

0. [A bug you want to work on](https://github.com/wpengine/faustjs/labels/help%20wanted)! If you have found a new bug, please [create an issue](https://github.com/wpengine/faustjs/issues/new/choose) before starting a pull request.
1. [A GitHub account](https://github.com/join).
2. A working copy of the code. See [DEVELOPMENT.md](/DEVELOPMENT.md).
3. A `changeset` that describes the changes you're making. You can create a `changeset` by running `npm run changeset` from the monorepo root.

## Housekeeping

Your pull request should:

- Reference the issue it fixes with `Fixes #123`, or `Related: #123` if it doesn't fully fix it
- Include a short description of what a reviewer would miss by only reading the diff, such as caveats, untested paths, or follow-ups
- Disclose any use of AI tools in the pull request template
- Be based on reasonably recent commit in the **canary** branch
- Include adequate tests
  - At least one test should fail in the absence of your non-test code changes. If your PR does not match this criteria, please specify why
  - Tests should include reasonable permutations of the target fix/change
  - Include baseline changes with your change
- Have a title that follows [Conventional Commits](https://www.conventionalcommits.org/). We squash and merge, so the title becomes the commit message on `canary`:

  ```
  <type>(<scope>): <short summary>
    │       │             │
    │       │             └─> Summary in present tense. Not capitalized. No period at the end.
    │       │
    │       └─> Scope (optional): eg. core, cli, blocks, plugin, deps
    │
    └─> Type: build, chore, ci, docs, fix, perf, refactor, revert, style, or test.
  ```

- To avoid line ending issues, set `autocrlf = input` and `whitespace = cr-at-eol` in your git configuration
