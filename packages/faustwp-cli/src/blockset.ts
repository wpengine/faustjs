import 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';

import { getWpUrl, getWpSecret } from './utils/index.js';
import { errorLog, infoLog, debugLog } from './stdout/log.js';

// Function to recursively find block.json files
function discoverBlockJsonFiles(
  dirPath = './wp-blocks',
  fileList: string[] = [],
) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      discoverBlockJsonFiles(filePath, fileList);
    } else if (file === 'block.json') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * This function gathers, organizes, and prepares blocks to use,
 * much like a traditional typesetter would with type.
 */
export async function blockset() {
  const faustDir = '.faust';
  const wpUrl = getWpUrl();
  const endpointUrl = `${wpUrl}/wp-json/faustwp/v1/blocks`;
  const blockJsonFiles = discoverBlockJsonFiles();
  const blocks: any[] = [];

  debugLog(`Discovered ${blockJsonFiles.length} blocks.`);

  blockJsonFiles.forEach((blockJsonFile) => {
    const data = JSON.parse(fs.readFileSync(blockJsonFile, 'utf8'));
    blocks.push(data);
  });

  const timestamp = Date.now();
  const lastUpdated = new Date(timestamp).toISOString();

  const blocksJson = JSON.stringify({ lastUpdated, blocks }, null, 4);

  if (!fs.existsSync(faustDir)) {
    fs.mkdirSync(faustDir);
  }

  // Create local file for debugging purposes.
  fs.writeFileSync(`${faustDir}/blocks.json`, blocksJson, { encoding: 'utf8' });

  // Send JSON data to the REST API endpoint.
  const response = await fetch(endpointUrl, {
    method: 'POST',
    body: blocksJson,
    headers: {
      'Content-Type': 'application/json',
      'x-faustwp-secret': getWpSecret() || '',
    },
  });

  if (response.ok) {
    infoLog(`${blockJsonFiles.length} block pushed to WordPress`);
  } else {
    errorLog('Block push failed:', response.statusText);
  }
}
