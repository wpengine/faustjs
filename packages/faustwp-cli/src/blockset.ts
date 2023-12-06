import fetch from 'isomorphic-fetch';
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob-promise';
import FormData from 'form-data';
import archiver from 'archiver';
import { spawnSync } from 'child_process';

import { getWpUrl, getWpSecret, hasYarn } from './utils/index.js';
import { debugLog } from './stdout/index.js';

// File paths used throughout the blockset process
export const ROOT_DIR = process.cwd();
export const FAUST_DIR = path.join(ROOT_DIR, '.faust');
export const FAUST_BUILD_DIR = path.join(FAUST_DIR, 'build');
export const BLOCKS_DIR = path.join(FAUST_DIR, 'blocks');
export const MANIFEST_PATH = path.join(BLOCKS_DIR, 'manifest.json');

const IGNORE_NODE_MODULES = '**/node_modules/**';
const FAUST_BLOCKS_SRC_DIR = 'wp-blocks';

// Ensure that the required directories for block processing exist
fs.ensureDirSync(BLOCKS_DIR);

/**
 * Represents the structure of the manifest file.
 */
export type Manifest = {
  blocks: any[];
  timestamp: string;
};

const manifest: Manifest = {
  blocks: [],
  timestamp: new Date().toISOString(),
};

/**
 * Interface representing the structure of the parsed PHP asset file.
 */
export interface PhpAsset {
  dependencies?: string[];
  version?: string;
}

/**
 * Parses a PHP asset file content and converts it into a JSON object.
 *
 * @param {string} phpContent - The content of the PHP asset file.
 * @returns {PhpAsset} - A JSON object representing the parsed content.
 */
export function parsePhpAssetFile(phpContent: string): PhpAsset {
  const jsonObject: PhpAsset = {};

  // Match the PHP array structure
  const matches = /return\s+array\(([^;]+)\);/.exec(phpContent);
  if (!matches || matches.length < 2) {
    console.error('Error: Unable to parse PHP file.');
    return {};
  }

  // Extract dependencies if present
  const dependenciesMatch = matches[1].match(
    /'dependencies'\s*=>\s*array\(([^)]+)\)/,
  );
  if (dependenciesMatch) {
    jsonObject.dependencies = dependenciesMatch[1]
      .split(',')
      .map((dep) => dep.trim().replace(/'/g, ''));
  }

  // Extract version if present
  const versionMatch = matches[1].match(/'version'\s*=>\s*'([^']+)'/);
  if (versionMatch) {
    const [, version] = versionMatch; // destructures versionMatch and skips the first element (which is the full match of the regex), directly assigning the second element (the captured group) to the variable version.
    jsonObject.version = version;
  }

  return jsonObject;
}

/**
 * Fetches paths to all block.json files while ignoring node_modules.
 *
 * @returns {Promise<string[]>} - An array of paths to block.json files.
 */
export async function fetchBlockFiles(): Promise<string[]> {
  return glob(`${FAUST_BUILD_DIR}/**/block.json`, {
    ignore: IGNORE_NODE_MODULES,
  });
}

/**
 * Processes each block.json file by copying its directory, updating the manifest,
 * and handling PHP files.
 *
 * @param {string[]} files - An array of paths to block.json files.
 * @returns {Promise<void>}
 */
export async function processBlockFiles(files: string[]): Promise<void> {
  await fs.emptyDir(BLOCKS_DIR);

  const fileProcessingPromises = files.map(async (filePath) => {
    const blockDir = path.dirname(filePath);
    const blockName = path.basename(blockDir);
    const destDir = path.join(BLOCKS_DIR, blockName);

    await fs.copy(blockDir, destDir);

    if (path.extname(filePath) === '.json') {
      try {
        const blockJson = await fs.readJson(filePath);
        manifest.blocks.push(blockJson);
      } catch (error) {
        console.error(`Error reading JSON file: ${filePath}`, error);
      }
    }

    // Handle PHP asset file
    const phpAssetPath = path.join(blockDir, 'index.asset.php');
    if (await fs.pathExists(phpAssetPath)) {
      const phpContent = await fs.readFile(phpAssetPath, 'utf8');
      const assetData = parsePhpAssetFile(phpContent);
      await fs.writeJson(path.join(destDir, 'index.asset.json'), assetData, {
        spaces: 2,
      });
      await fs.remove(phpAssetPath);
    }

    // Remove any other PHP files
    const phpFiles = await glob(`${destDir}/**/*.php`, {
      ignore: IGNORE_NODE_MODULES,
    });
    await Promise.all(phpFiles.map((file) => fs.remove(file)));
  });

  await Promise.all(fileProcessingPromises);
}

/**
 * Creates a ZIP archive of the blocks.
 *
 * @returns {Promise<string>} - Path to the created ZIP archive.
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
      body: form,
      timeout: 30000, // 30 seconds timeout
    } as unknown as RequestInit);

    if (!response.ok) {
      throw new Error(`Error uploading to WordPress: ${await response.text()}`);
    }

    try {
      console.log(await response.json());
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
 * Compiles the blocks and places them into the FAUST build directory.
 *
 * @returns {Promise<void>}
 */
export async function compileBlocks(): Promise<void> {
  debugLog(`Faust: Compiling Blocks into ${FAUST_BUILD_DIR}`);
  await fs.emptyDir(FAUST_BUILD_DIR);
  const command = hasYarn() ? 'yarn' : 'npm';
  let args = ['exec', 'wp-scripts', 'start', '--package=@wordpress/scripts'];
  if (!hasYarn()) {
    args.push('--verbose');
    args.push('--');
  }
  args = args.concat([
    '--no-watch',
    `--webpack-src-dir=${FAUST_BLOCKS_SRC_DIR}`,
    `--output-path="${FAUST_BUILD_DIR}"`,
  ]);
  const res = spawnSync(command, args, {
    shell: true,
    stdio: 'inherit',
    encoding: 'utf8',
  });
  if (res.status && res.status > 0) {
    process.exit(res.status);
  }
}

/**
 * Main function to process block files, create a ZIP archive, and upload to WordPress.
 *
 * @returns {Promise<void>}
 */
export async function blockset(): Promise<void> {
  try {
    await compileBlocks();
    const files = await fetchBlockFiles();
    await processBlockFiles(files);
    await fs.writeJson(MANIFEST_PATH, manifest, { spaces: 2 });
    const zipPath = await createZipArchive();
    await uploadToWordPress(zipPath);
  } catch (error) {
    console.error(`"faust blockset" failed with the following error:`, error);
  }
}
