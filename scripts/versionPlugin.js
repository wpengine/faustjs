/**
 * Versions the FaustWP plugin.
 */

const fs = require('fs/promises');
const path = require("path");

const readFile = (filename) => fs.readFile(filename, { encoding: "utf8" });
const writeFile = fs.writeFile;

/**
 * Runs all WordPress plugin versioning operations for FaustWP
 * including version bumps and readme.txt changelog updates.
 */
async function versionPlugin() {
  const pluginPath = path.join(__dirname, '../plugins/faustwp');
  const pluginFile = path.join(pluginPath, 'faustwp.php');
  const readmeTxt  = path.join(pluginPath, 'readme.txt');
  const changelog  = path.join(pluginPath, 'CHANGELOG.md');
  const infoJson   = path.join(pluginPath, 'info.json');

  const version = await getNewVersion(pluginPath);

  if ( version ) {
    bumpPluginHeader(pluginFile, version);
    await bumpStableTag(readmeTxt, version);
    await generateReadmeChangelog(readmeTxt, changelog);
    await updateInfoJson(infoJson, readmeTxt, changelog, version);
  }
}

/**
 * Updates the version number found in the header comment of a given
 * WordPress plugin's main PHP file.
 *
 * @param {String} pluginFile Full path to a file containing a WordPress
 *                            plugin header comment.
 * @param {String} version    The new version number.
 */
async function bumpPluginHeader(pluginFile, version) {
  return bumpVersion(pluginFile, /^\s*\*\s*Version:\s*([0-9.]+)$/gm, version);
}

/**
 * Updates the stable tag found in a given WordPress plugin's readme.txt file.
 *
 * @param {String} pluginFile Full path to a file containing a WordPress
 *                            plugin header comment.
 * @param {String} version    The new version number.
 */
async function bumpStableTag(readmeTxt, version) {
  return bumpVersion(readmeTxt, /^Stable tag:\s*([0-9.]+)$/gm, version);
}

/**
 * Replaces the version number in the first line of a file matching the given
 * regular expression.
 *
 * Note that this function depends on a properly formatted regular expression.
 * The given regex should meet the following criteria:
 *
 *   1. Begins with ^ and ends with $ so that we can match an entire line.
 *   2. Contains one and only one capturing group that matches only the version
 *      number portion of the line. For example, in the line " * Version: 1.0.0"
 *      capturing group 1 of the regex must resolve to "1.0.0".
 *
 * @param {String} file    Full path to the file to update.
 * @param {RegExp} regex   A valid regular expression as noted above.
 * @param {String} version The new version number.
 */
async function bumpVersion(file, regex, version) {
  try {
    let data = await readFile(file);
    const matches = regex.exec(data);

    if ( ! matches ) {
      throw new Error(`Version string does not exist in ${file}`);
    }

    // Replace the version number in the captured line.
    let versionString = matches[0].replace(matches[1], version);

    // Replace the captured line with the new version string.
    data = data.replace(matches[0], versionString);

    return writeFile(file, data);
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Get the current version number from a plugin's package.json file.
 *
 * @param {String} pluginPath Full path to the directory containing the plugin's
 *                            package.json file.
 * @returns The version number string found in the plugin's package.json.
 */
async function getNewVersion(pluginPath) {
  const packageJsonFile = path.join(pluginPath, 'package.json');

  try {
    let packageJson = await readFile(packageJsonFile);

    return JSON.parse(packageJson)?.version;
  } catch (e) {
    if (e instanceof SyntaxError) {
      e.message = `${e.message} in ${packageJsonFile}.\n`;
    }

    console.warn(e);
  }
}

/**
 * Updates the FaustWP plugin's readme.txt changelog with the latest 3 releases
 * found in the plugin's CHANGELOG.md file.
 *
 * @param {String} readmeTxtFile Full path to the plugin's readme.txt file.
 * @param {String} changelog     Full path to the plugin's CHANGELOG.md file.
 */
async function generateReadmeChangelog(readmeTxtFile, changelog) {
  let output = "";

  try {
    let readmeTxt = await readFile(readmeTxtFile);
    changelog     = await readFile(changelog);

    changelog = changelog.replace(
      "# Faust",
      "== Changelog =="
    );

    // split the contents by new line
    const changelogLines = changelog.split(/\r?\n/);
    const processedLines = [];
    let versionCount = 0;

    // print all lines in current version
    changelogLines.every((line) => {
      // Version numbers in CHANGELOG.md are h2
      if (line.startsWith("## ")) {
        if (versionCount == 3) {
          return false;
        }
        // Format version number for WordPress
        line = line.replace("## ", "= ") + " =";
        versionCount++;
      }

      processedLines.push(line);

      return true;
    });

    changelog = processedLines.join("\n");

    const changelogStart = readmeTxt.indexOf('== Changelog ==');

    output = readmeTxt.substring(0, changelogStart) + changelog;
    output += "\n[View the full changelog](https://github.com/wpengine/faustjs/blob/canary/plugins/faustwp/CHANGELOG.md)";

    return writeFile(readmeTxtFile, output);
  } catch(e) {
    console.warn(e);
  }
}

/**
 * Refreshes the release-time fields in the plugin's info.json manifest used by
 * the non-wordpress.org update channel. Updates version, last_updated, tested,
 * download_link, the versions map, and the changelog section. Fields that are
 * not release-driven (contributors, ratings, banners, etc.) are preserved.
 *
 * @param {String} infoJsonFile Full path to the plugin's info.json.
 * @param {String} readmeTxt    Full path to the plugin's readme.txt.
 * @param {String} changelog    Full path to the plugin's CHANGELOG.md.
 * @param {String} version      The new version number.
 */
async function updateInfoJson(infoJsonFile, readmeTxt, changelog, version) {
  try {
    const raw  = await readFile(infoJsonFile);
    const info = JSON.parse(raw);

    info.version       = version;
    info.last_updated  = formatLastUpdated(new Date());
    info.download_link = buildDownloadLink(version);
    info.versions      = info.versions || {};
    info.versions[version] = info.download_link;

    const readme = await readFile(readmeTxt);
    const tested = readme.match(/^Tested up to:\s*([0-9.]+)$/m);
    if ( tested ) {
      info.tested = tested[1];
    }

    info.sections = info.sections || {};
    info.sections.changelog = await buildInfoJsonChangelog(changelog);

    return writeFile(infoJsonFile, JSON.stringify(info, null, 2) + "\n");
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Builds the download URL for a given version. The host matches the value the
 * shipped updater client already calls in includes/updates/.
 *
 * @param {String} version
 */
function buildDownloadLink(version) {
  return `https://wpe-plugin-updates.wpengine.com/faustwp/faustwp.${version}.zip`;
}

/**
 * Formats a Date as the "YYYY-MM-DD h:mmam/pm GMT" string the manifest uses.
 *
 * @param {Date} d
 */
function formatLastUpdated(d) {
  const y   = d.getUTCFullYear();
  const mo  = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  const min = String(d.getUTCMinutes()).padStart(2, '0');
  let h = d.getUTCHours();
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12;
  if (h === 0) { h = 12; }
  return `${y}-${mo}-${day} ${h}:${min}${ampm} GMT`;
}

/**
 * Builds the sections.changelog string for info.json from CHANGELOG.md.
 * Mirrors the readme.txt logic (last 3 versions, "## X" → "= X =") but joins
 * lines with a blank line so paragraph spacing matches the wordpress.org API
 * shape that the manifest consumer expects.
 *
 * @param {String} changelogFile
 */
async function buildInfoJsonChangelog(changelogFile) {
  const source = (await readFile(changelogFile))
    .replace(/^# Faust\s*$/m, '')
    .trim();

  const lines = source.split(/\r?\n/);
  const out = [];
  let versionCount = 0;

  for (const raw of lines) {
    let line = raw;
    if (line.startsWith('## ')) {
      if (versionCount === 3) { break; }
      line = line.replace('## ', '= ') + ' =';
      versionCount++;
    }
    out.push(line);
  }

  out.push('[View the full changelog](https://github.com/wpengine/faustjs/blob/canary/plugins/faustwp/CHANGELOG.md)');
  return out.join('\n\n');
}

versionPlugin();
