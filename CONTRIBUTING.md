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

We also accept suggestions in the issue tracker. Be sure to [search](https://github.com/wpengine/faustjs/search?type=Issues) first.

In general, things we find useful when reviewing suggestions are:

- A description of the problem you're trying to solve
- An overview of the suggested solution
- Examples of how the suggestion would work in various places
  - Code examples showing e.g. "this would be an error, this wouldn't"
  - Code examples showing usage (if possible)
- If relevant, precedent in other frameworks or libraries can be useful for establishing context and expected behavior

# Instructions For Contributing Code

## What You'll Need

0. [A bug or feature you want to work on](https://github.com/wpengine/faustjs/labels/help%20wanted)! If you have found a new bug or want to propose a feature, please [create an issue](https://github.com/wpengine/faustjs/issues/new/choose) before starting a pull request.
1. [A GitHub account](https://github.com/join).
2. A working copy of the code. See [DEVELOPMENT.md](/DEVELOPMENT.md).
3. A `changeset` that describes the changes you're making. You can create a `changeset` by running `npm run changeset` from the monorepo root.

## Housekeeping

Your pull request should:

- Include a description of what your change intends to do
- Reference any open issues that the PR addresses
- Be based on reasonably recent commit in the **canary** branch
- Include adequate tests
  - At least one test should fail in the absence of your non-test code changes. If your PR does not match this criteria, please specify why
  - Tests should include reasonable permutations of the target fix/change
  - Include baseline changes with your change
- Contain proper [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716#gistcomment-3711094) as follows:

  ```
    <type>[<scope>]: (<issue #>) <short summary>
      │      │           |             │
      |      |           |             └─> Summary in present tense. Not capitalized. No period at the end.
      |      |           |
      │      │           └─> Issue # (optional): Issue number if related to bug database.
      │      │
      │      └─> Scope (optional): eg. common, compiler, authentication, core
      │
      └─> Type: chore, docs, feat, fix, refactor, style, or test.
  ```

- To avoid line ending issues, set `autocrlf = input` and `whitespace = cr-at-eol` in your git configuration
