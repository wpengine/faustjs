'use strict';

const fs = require('fs');

const proposedLockfile = getJson('proposed/package-lock.json');
const currentLockfile = getJson('current/package-lock.json');

console.log({proposedLockfile, currentLockfile });

function getJson(path) {
  let rawdata = fs.readFileSync(path);
  let dependencies = JSON.parse(rawdata);

  return dependencies;
}
