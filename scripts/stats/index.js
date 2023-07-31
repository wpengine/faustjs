import * as contributors from "./src/contributors.js"
import * as downloads from "./src/downloads.js"

(async () => {
    let stats = {}

    const contributorStats = await contributors.getStats();
    const downloadStats = await downloads.getStats();

    stats.contributors = contributorStats
    stats.downloads = downloadStats;

    console.log(stats);
})();
