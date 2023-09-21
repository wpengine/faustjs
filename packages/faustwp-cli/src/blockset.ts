import 'isomorphic-fetch';
import FormData from 'form-data';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import archiver from 'archiver';

import { getWpUrl, getWpSecret } from './utils/index.js';

const rootDir: string = process.cwd();
const faustDir: string = path.join(rootDir, '.faust');
const blocksDir: string = path.join(faustDir, 'blocks');
const manifestPath: string = path.join(faustDir, 'manifest.json');

// Ensure required directories exist
fs.ensureDirSync(blocksDir);

// Initialize manifest object
const manifest: { blocks: any[]; timestamp: string } = {
  blocks: [],
  timestamp: new Date().toISOString(),
};

/**
 * Fetch block.json files, ignoring node_modules.
 */
async function fetchBlockFiles(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(`${rootDir}/**/block.json`, { ignore: '**/node_modules/**' }, (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

/**
 * Process each block.json file.
 */
async function processBlockFiles(files: string[]): Promise<void> {
  for (const filePath of files) {
    const blockDir = path.dirname(filePath);
    const blockName = path.basename(blockDir);
    const destDir = path.join(blocksDir, blockName);

    await fs.copy(blockDir, destDir);

    const blockJson = await fs.readJson(filePath);
    manifest.blocks.push(blockJson);
  }
}

/**
 * Create a ZIP archive of the blocks.
 */
async function createZipArchive(): Promise<string> {
  const zipPath = path.join(faustDir, 'blocks.zip');
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip');

  archive.pipe(output);
  archive.directory(blocksDir, false);
  await archive.finalize();

  return zipPath;
}

/**
 * Upload the ZIP archive to WordPress.
 */
async function uploadToWordPress(zipPath: string): Promise<void> {
  const form = new FormData();
  form.append('zipfile', fs.createReadStream(zipPath));

  const apiUrl = `${getWpUrl()}/wp-json/faustwp/v1/blockset`;
  const headers = {
    ...form.getHeaders(),
    'x-faustwp-secret': getWpSecret() || '',
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: form as any,
    headers,
  });

  const responseText = await response.text();
  console.log("Raw response:", responseText);

  if (response.ok) {
    try {
      const data = await response.json();
      console.log('Successfully uploaded to WordPress:', data);
    } catch (error) {
      console.error("Error parsing response as JSON:", error);
    }
  } else {
    const errorData = await response.text();
    throw new Error(`Error uploading to WordPress: ${errorData}`);
  }
}

export async function blockset(): Promise<void> {
  try {
    const files = await fetchBlockFiles();
    await processBlockFiles(files);
    await fs.writeJson(manifestPath, manifest, { spaces: 2 });
    const zipPath = await createZipArchive();
    await uploadToWordPress(zipPath);
  } catch (error) {
    console.error(`"faust blockset" failed with the following error: `, error);
    process.exit(0);
  }
}
