async function mergeToMain({github, context}) {
  console.log("TEST: Merging canary to main...");

  const result = await github.rest.repos.merge({
      ...context.repo,
      base: "TEST_main",
      head: "TEST_canary",
      commit_message: "TEST: Merge release from branch `canary` into `main`"
  });

  return result;
}

module.exports = {
  mergeToMain
}
