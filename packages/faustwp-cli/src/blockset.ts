import fetch from 'isomorphic-fetch';
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob-promise';
import FormData from 'form-data';
import archiver from 'archiver';

import { getWpUrl, getWpSecret } from './utils/index.js';
import { infoLog, errorLog, debugLog } from './stdout/index.js';

const ROOT_DIR = process.cwd();
const FAUST_DIR = path.join(ROOT_DIR, '.faust');
const BLOCKS_DIR = path.join(FAUST_DIR, 'blocks');
const MANIFEST_PATH = path.join(FAUST_DIR, 'manifest.json');
const IGNORE_NODE_MODULES = '**/node_modules/**';

// Ensure required directories exist
fs.ensureDirSync(BLOCKS_DIR);

export type Manifest = {
  blocks: any[];
  timestamp: string;
};

const manifest: Manifest = {
  blocks: [],
  timestamp: new Date().toISOString(),
};

/**
 * Fetches paths to all block.json files while ignoring node_modules.
 *
 * @returns {Promise<string[]>} An array of paths to block.json files.
 */
export async function fetchBlockFiles(): Promise<string[]> {
  return glob(`${ROOT_DIR}/**/block.json`, { ignore: IGNORE_NODE_MODULES });
}

/**
 * Processes each block.json file, copying its directory and updating the manifest.
 *
 * @param {string[]} files - An array of paths to block.json files.
 * @returns {Promise<void>}
 */
export async function processBlockFiles(files: string[]): Promise<void> {
  // Clean up the blocks directory now that we have the list of block files
  await fs.emptyDir(BLOCKS_DIR);

  for (const filePath of files) {
    const blockDir = path.dirname(filePath);
    const blockName = path.basename(blockDir);
    const destDir = path.join(BLOCKS_DIR, blockName);

    await fs.copy(blockDir, destDir);

    const blockJson = await fs.readJson(filePath);
    manifest.blocks.push(blockJson);
  }
}

/**
 * Creates a ZIP archive of the blocks.
 *
 * @returns {Promise<string>} Path to the created ZIP archive.
 */
export async function createZipArchive(): Promise<string> {
  const zipPath = path.join(FAUST_DIR, 'blocks.zip');
  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip');

  archive.pipe(output);
  archive.directory(BLOCKS_DIR, false);
  await archive.finalize();

  return zipPath;
}

/**
 * Uploads the ZIP archive to WordPress.
 *
 * @param {string} zipPath - Path to the ZIP archive to be uploaded.
 * @returns {Promise<void>}
 */
export async function uploadToWordPress(zipPath: string): Promise<void> {
  if (!fs.existsSync(zipPath)) {
    throw new Error('Provided zipPath does not exist.');
  }

  const form = new FormData();
  form.append('zipfile', fs.createReadStream(zipPath));

  const apiUrl = `${getWpUrl()}/wp-json/faustwp/v1/blockset`;
  const headers = {
    ...form.getHeaders(),
    'x-faustwp-secret': getWpSecret() || '',
  };

  try {
    const response = await fetch(apiUrl, {
      headers,
      method: 'POST',
      // @ts-ignore
      body: form,
      timeout: 30000, // 30 seconds timeout
    });

    if (!response.ok) {
      throw new Error(`Error uploading to WordPress: ${await response.text()}`);
    }

    try {
      infoLog('WordPress:', await response.json());
    } catch (jsonError) {
      if (jsonError instanceof Error) {
        throw new Error('Error parsing response from WordPress.');
      }
      throw jsonError;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out.');
      }
      throw new Error(`Network error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Main function to process block files, create a ZIP archive, and upload to WordPress.
 *
 * @returns {Promise<void>}
 */
export async function blockset(): Promise<void> {
  try {
    const files = await fetchBlockFiles();
    await processBlockFiles(files);
    await fs.writeJson(MANIFEST_PATH, manifest, { spaces: 2 });
    const zipPath = await createZipArchive();
    await uploadToWordPress(zipPath);
  } catch (error) {
    console.error(`"faust blockset" failed with the following error:`, error);
  }
}
