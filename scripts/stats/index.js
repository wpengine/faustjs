import npm from "npm-stats-api";
import { addDays, isEqual } from "date-fns";
import * as fs from "node:fs";
import axios from "axios";

//const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function npmStats(npmPackage, date) {
  try {
    const res = await npm.stat(npmPackage, date, date);
    return res.body;
  } catch (error) {
    console.log(error);
  }
}

function getDate(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1) +
    "-" +
    date.getUTCDate()
  );
}

var packages = [
  "@faustwp/core",
  "@faustwp/cli",
  "@faustwp/blocks",
  "@faustjs/next",
  "@faustjs/react",
  "@faustjs/core",
];

(async () => {
  var date = new Date("2022-01-01");
  var end = new Date("2023-03-29"); // inclusive (will not be accurate for today)

  const pluginStats = await axios
    .get(
      "https://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=faustwp&limit=730",
      {
        headers: {
          Accept: "accept",
          Authorization: "authorize",
        },
      }
    )
    .then((response) => {
      const arr = Object.keys(response.data).map((key) => [
        key,
        response.data[key],
      ]);
      return arr;
    })
    .catch((err) => {
      console.log(err);
    });

  const fileStream = fs.createWriteStream("stats.csv");

  fileStream.on("error", (error) => {
    console.log(
      `An error occured while writing to the file. Error: ${error.message}`
    );
  });

  var output = "type,name,date,downloads\n";

  fileStream.write(output);

  while (date <= end) {
    var currDownloads;

    for (const npmPackage of packages) {
      currDownloads = await npmStats(npmPackage, getDate(date));

      output =
        "package," +
        currDownloads.package +
        "," +
        currDownloads.start +
        "," +
        currDownloads.downloads +
        "\n";

      fileStream.write(output);
    }

    for (const stat of pluginStats) {
      const statDate = new Date(stat[0]);
      if (isEqual(statDate, date)) {
        output = "plugin,faustwp," + stat[0] + "," + stat[1] + "\n";

        fileStream.write(output);
      }
    }

    date = addDays(date, 1);
  }

  fileStream.end();
  fileStream.on("finish", () => {
    console.log("Download stats have been written to stats.csv");
  });
})();
