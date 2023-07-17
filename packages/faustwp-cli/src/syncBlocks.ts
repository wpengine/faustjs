import 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';

import { getWpUrl, getWpSecret } from './utils/index.js';
import { infoLog } from './stdout/log.js';

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

export async function syncBlocks() {
  const wpUrl = getWpUrl();
  const endpointUrl = `${wpUrl}/wp-json/faustwp/v1/blocks`;
  const blockJsonFiles = discoverBlockJsonFiles();
  const blocks: any[] = [];

  infoLog(`Discovered ${blockJsonFiles.length} blocks to sync.`);

  blockJsonFiles.forEach((blockJsonFile) => {
    const data = JSON.parse(fs.readFileSync(blockJsonFile, 'utf8'));
    blocks.push(data);
  });

  const lastUpdated = Date.now();

  // Send JSON data to the REST API endpoint
  const response = await fetch(endpointUrl, {
    method: 'POST',
    body: JSON.stringify({
      lastUpdated,
      blocks,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-faustwp-secret': getWpSecret() || '',
    },
  });

  if (response.ok) {
    infoLog('Blocks synced successfully!');
  } else {
    console.log('Failed to send JSON data:', response.statusText);
  }
}
