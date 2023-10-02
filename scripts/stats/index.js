import * as contributors from "./src/contributors.js"
import * as downloads from "./src/downloads.js"
import { inspect } from 'util'

(async () => {
    let stats = {}

    stats.contributors = await contributors.getStats();
    stats.downloads = await downloads.getStats();
    stats.wpgql = await downloads.getWPGQLDownloads();

    console.log(inspect(stats, false, null, true))
})();
