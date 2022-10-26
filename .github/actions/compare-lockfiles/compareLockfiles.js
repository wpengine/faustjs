'use strict';

const core = require('@actions/core');
const semverLt = require('semver/functions/lt');
const { parseLockfile, getLockfilePackageVersions } = require('./helpers');

const currentLockfileInput = core.getInput('current-lockfile-path') || 'current';
const proposedLockfileInput = core.getInput('proposed-lockfile-path') || 'proposed';

// Exit script if both inputs are the same directory (case insensitive).
if (currentLockfileInput.toLowerCase() === proposedLockfileInput.toLowerCase()) {
  console.error('current-lockfile-path & proposed-lockfile-path cannot be the same');
  process.exit(1);
}

const currentLockfile = parseLockfile(currentLockfileInput);
const proposedLockfile = parseLockfile(proposedLockfileInput);

// Exit script if different package-lock.json schema versions.
if (proposedLockfile.lockfileVersion !== currentLockfile.lockfileVersion) {
  console.error('package-lock.json versions do not match');
  process.exit(1);
}

const currentPackageVersions = getLockfilePackageVersions(currentLockfile);
const proposedPackageVersions = getLockfilePackageVersions(proposedLockfile);

const regressions = proposedPackageVersions.filter(function(proposed) {
  const current = currentPackageVersions.find(current => current.key === proposed.key);

  if (proposed === undefined || current === undefined) {
    return;
  }

  return semverLt(proposed.version, current.version); // proposed.version < current.version.
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
process.exit(0);
