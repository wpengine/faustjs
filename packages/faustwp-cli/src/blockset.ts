import 'isomorphic-fetch';
import FormData from 'form-data';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import archiver from 'archiver';

import { getWpUrl, getWpSecret } from './utils/index.js';

// Define directories and paths
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

export async function blockset(): Promise<void> {
  try {
    // Function to find and process block.json files
    glob(`${rootDir}/**/block.json`, async (err: Error | null, files: string[]) => {
      if (err) {
        throw new Error(`Error while searching for block.json files: ${err}`);
      }

      // Loop through each block.json file
      for (const filePath of files) {
        const blockDir: string = path.dirname(filePath);
        const blockName: string = path.basename(blockDir);
        const destDir: string = path.join(blocksDir, blockName);

        // Copy block directory to .faust/blocks
        await fs.copy(blockDir, destDir);

        // Read block.json and add to manifest
        const blockJson: any = await fs.readJson(filePath);
        manifest.blocks.push(blockJson);
      }

      // Write manifest.json
      await fs.writeJson(manifestPath, manifest, { spaces: 2 });

      // Create ZIP archive of .faust/blocks
      const archive = archiver('zip');
      const zipPath: string = path.join(faustDir, 'blocks.zip');
      const output = fs.createWriteStream(zipPath);

      archive.pipe(output);
      archive.directory(blocksDir, false);
      await archive.finalize();

      // Prepare form data for POST request
      const form = new FormData();
      form.append('zipfile', fs.createReadStream(zipPath));

      // Make a POST request to the WordPress REST endpoint
      const wpUrl = getWpUrl();
      const apiUrl: string = `${wpUrl}/wp-json/faustwp/v1/blockset`;

      // Merge custom headers with form headers
      const headers = {
        ...form.getHeaders(),
        'x-faustwp-secret': getWpSecret() || '',
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: form as any,
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Successfully uploaded to WordPress:', data);
      } else {
        const errorData = await response.text();
        throw new Error(`Error uploading to WordPress: ${errorData}`);
      }
    });
  } catch (error) {
    console.error(`"faust blockset" failed with the following error: `, error);
    process.exit(0);
  }
}
