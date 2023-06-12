//Generates 28-day download stats

import npm from "npm-stats-api";
import { subDays } from "date-fns";
import axios from "axios";

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
  var currentDate = new Date(new Date().setDate(new Date().getDate() - 1));
  var priorDate = new Date(new Date().setDate(currentDate.getDate() - 27));

  var totals = [];

  totals["end-data"] = getDate(currentDate);
  totals["start-date"] = getDate(priorDate);
  totals["download-counts"] = [];

  const pluginStats = await axios
    .get(
      "https://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=faustwp&limit=29",
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

      var downloadCount = 0;

      for (let value of arr) {
        downloadCount = downloadCount + parseInt(value[1]);
      }

      return downloadCount;
    })
    .catch((err) => {
      console.log(err);
    });

  while (currentDate > priorDate) {
    for (const npmPackage of packages) {
      let currDownloads = await npmStats(npmPackage, getDate(currentDate));

      if (totals["download-counts"][npmPackage] === undefined) {
        totals["download-counts"][npmPackage] = currDownloads.downloads;
      } else {
        totals["download-counts"][npmPackage] =
          totals["download-counts"][npmPackage] + currDownloads.downloads;
      }
    }

    currentDate = subDays(currentDate, 1);
  }

  totals["download-counts"]["faustwp"] = pluginStats;

  var totalDownloads = 0;

  for (var downCount in totals["download-counts"]) {
    var packDownloads = totals["download-counts"][downCount];
    totalDownloads = totalDownloads + packDownloads;
  }

  totals["average-downloads"] = parseInt(totalDownloads / 28);

  console.log(totals);
})();
