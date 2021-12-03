/**
 * Updates the FaustWP plugin's readme.txt changelog with the
 * latest 3 releases found in the plugin's CHANGELOG.md file.
 */

const fs = require("fs");
const path = require("path");
const util = require("util");
const readFile = (fileName) => util.promisify(fs.readFile)(fileName, "utf8");
const pluginPath = path.join(__dirname, '../plugins/faustwp');
const changelogPath = path.join(pluginPath, "CHANGELOG.md");
const readmePath = path.join(pluginPath, "readme.txt");

async function buildPluginReadme() {
  let output = "";
  let changelog = "";

  changelog = await readFile(changelogPath);

  changelog = changelog.replace(
    "# FaustWP",
    "== Changelog =="
  );

  // split the contents by new line
  const origLines = changelog.split(/\r?\n/);
  const processedLines = [];
  let versionCount = 0;

  // print all lines in current version
  origLines.every((line) => {
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

  fs.readFile(
    readmePath,
    'utf-8',
    function (err, data) {
      if (err) throw err;

      const changelogStart = data.indexOf('== Changelog ==');
      output = data.substring(0, changelogStart) + changelog;
      output += "\n[View the full changelog](https://faustjs.org/docs/changelog/faustwp)";

      fs.writeFile(
        readmePath,
        output,
        (err) => {
          if (err) throw err;
          console.log("Plugin readme.txt has been updated!");
        }
      );
    }
  );
}

buildPluginReadme();
