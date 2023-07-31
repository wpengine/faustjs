import * as contributors from "./src/contributors.js"
import * as downloads from "./src/downloads.js"

(async () => {
    let stats = {}

    stats.contributors = await contributors.getStats();
    stats.downloads = await downloads.getStats();

    console.log(stats);
})();
