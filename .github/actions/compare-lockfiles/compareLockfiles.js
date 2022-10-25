'use strict';

const core = require('@actions/core');
const semverLt = require('semver/functions/lt');
const { parseLockfile, getLockfilePackageVersions } = require('./helpers');

const currentLockfile = parseLockfile(core.getInput('current-lockfile-path') || 'current');
const proposedLockfile = parseLockfile(core.getInput('proposed-lockfile-path') || 'proposed');

// Exit script if different package-lock.json schema versions.
if (proposedLockfile.lockfileVersion !== currentLockfile.lockfileVersion) {
  console.log('package-lock.json versions do not match');
  process.exit(1);
}

const currentPackageVersions = getLockfilePackageVersions(currentLockfile);
const proposedPackageVersions = getLockfilePackageVersions(proposedLockfile);

const regressions = proposedPackageVersions.filter(function(proposed) {
  const current = currentPackageVersions.find(current => current.key === proposed.key);
  const hasRegression = semverLt(proposed.version, current.version); // proposed.version < current.version.
  return hasRegression;
}).map((r) => {
  return {
    'Key': r.key,
    'Current Version': currentPackageVersions.find(current => current.key === r.key).version,
    'Proposed Version': r.version,
  };
});

// Exit script if regressions are found.
if (regressions.length) {
  console.log('Regressions Found!');
  console.table(regressions);
  process.exit(1);
}

console.log('OK');
