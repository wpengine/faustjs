const fs = require('fs');

/**
 * Returns the parsed JSON object.
 * @param {string} path Path to the JSON file.
 * @returns {object}
 */
function parseLockfile(path) {
  let rawdata = fs.readFileSync(`${path}/package-lock.json`);

  return JSON.parse(rawdata);
}

/**
 * Returns an array of objects.
 * @param {array} packages The package object from package-lock.json.
 * @returns {array}
 */
function getLockfilePackageVersions({ packages }) {
  let packageVersions = [];

  for (let key of Object.keys(packages)) {
    packageVersions.push({
      key: key,
      version: packages[key].version
    });
  }

  return packageVersions;
}

module.exports = { parseLockfile, getLockfilePackageVersions };
