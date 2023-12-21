import { spawnSync, SpawnSyncReturns } from 'child_process';
jest.mock('child_process');
import { hasYarn } from '../../src/utils/hasYarn.js';
jest.mock('../../src/utils/hasYarn.js', () => ({
  __esModule: true,
  hasYarn: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
}));

import {
  compileBlocks,
  parsePhpAssetFile,
  processBlockFiles,
  BLOCKS_DIR,
  FAUST_DIR
} from '../../src/blockset';
import fs from 'fs-extra';
import path from 'path';

const spawnSyncMock = spawnSync as unknown as jest.Mock<
  Partial<SpawnSyncReturns<string[]>>
>;

describe('blockset command', () => {
  describe('compileBlocks step', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('compiles the list of blocks within the wp-blocks folder using yarn', async () => {
      spawnSyncMock.mockReturnValueOnce({
        output: [['Blocks Compiled']],
      });

      await compileBlocks();
      expect(spawnSyncMock).toBeCalledTimes(1);
      expect(spawnSyncMock).toHaveBeenCalledWith(
        'yarn',
        expect.arrayContaining([
          'exec',
          'wp-scripts',
          'start',
          '--package=@wordpress/scripts',
          '--verbose',
          '--',
          '--no-watch',
          '--webpack-src-dir=wp-blocks',
        ]),
        { encoding: 'utf8', shell: true, stdio: 'inherit' },
      );
    });
    it('compiles the list of blocks within the wp-blocks folder using npm', async () => {
      spawnSyncMock.mockReturnValueOnce({
        output: [['Blocks Compiled']],
      });

      await compileBlocks();
      expect(spawnSyncMock).toBeCalledTimes(1);
      expect(spawnSyncMock).toHaveBeenCalledWith(
        'npm',
        expect.arrayContaining([
          'exec',
          'wp-scripts',
          'start',
          '--package=@wordpress/scripts',
          '--verbose',
          '--',
          '--no-watch',
          '--webpack-src-dir=wp-blocks',
        ]),
        { encoding: 'utf8', shell: true, stdio: 'inherit' },
      );
    });
  });

  describe('PHP file processing', () => {
    const mockSourceDir = path.join(__dirname, 'mockSourceDir');
    const mockPhpFilePath = path.join(mockSourceDir, 'index.asset.php');

    const mockPhpContent = `
<?php
return array(
    'dependencies' => array(
        'react',
        'wp-block-editor',
        'wp-blocks',
        'wp-i18n',
        'wp-components',
        'wp-hooks'
    ),
    'version' => '00000000000000001234'
);
`;

    const expectedJson = {
      dependencies: [
        'react',
        'wp-block-editor',
        'wp-blocks',
        'wp-i18n',
        'wp-components',
        'wp-hooks',
      ],
      version: '00000000000000001234',
    };

    beforeAll(async () => {
      await fs.ensureDir(mockSourceDir);
      await fs.writeFile(mockPhpFilePath, mockPhpContent);
    });

    afterAll(async () => {
      await fs.remove(mockSourceDir);
      await fs.remove(FAUST_DIR);
    });

    it('should convert PHP file to JSON and remove the original PHP file', async () => {
      await processBlockFiles([mockPhpFilePath]);
    
      // Use the BLOCKS_DIR for locating the JSON file
      const blockName = path.basename(path.dirname(mockPhpFilePath));
      const jsonFilePath = path.join(BLOCKS_DIR, blockName, 'index.asset.json');
      expect(await fs.pathExists(jsonFilePath)).toBeTruthy();
    
      // Check JSON file content
      const jsonContent = await fs.readJson(jsonFilePath);
      expect(jsonContent).toEqual(expectedJson);
    
      // Check PHP file removal
      expect(await fs.pathExists(mockPhpFilePath)).toBeFalsy();
    });
  });

  // Test with correctly formatted PHP content
  it('correctly parses valid PHP content', () => {
    const validPhpContent = `
      <?php
      return array(
          'dependencies' => array(
              'react',
              'wp-block-editor'
          ),
          'version' => '1.0.0'
      );
    `;
    const expectedJson = {
      dependencies: ['react', 'wp-block-editor'],
      version: '1.0.0'
    };
    expect(parsePhpAssetFile(validPhpContent)).toEqual(expectedJson);
  });

  it('returns an empty object for invalid PHP content', () => {
    const invalidPhpContent = `<?php echo "Not a valid asset file"; ?>`;
    expect(parsePhpAssetFile(invalidPhpContent)).toEqual({});
  });

  it('returns an empty object for empty PHP content', () => {
    const emptyPhpContent = '';
    expect(parsePhpAssetFile(emptyPhpContent)).toEqual({});
  });

  it('handles missing dependencies', () => {
    const missingDependencies = `
      <?php
      return array(
          'version' => '1.0.0'
      );
    `;
    expect(parsePhpAssetFile(missingDependencies)).toEqual({ version: '1.0.0' });
  });

  it('handles missing version', () => {
    const missingVersion = `
      <?php
      return array(
          'dependencies' => array('react')
      );
    `;
    expect(parsePhpAssetFile(missingVersion)).toEqual({ dependencies: ['react'] });
  });

  it('parses content with extra whitespace and different formatting', () => {
    const formattedPhpContent = `
      <?php
      return array( 'dependencies' => array( 'react', 'wp-editor' ), 'version' => '2.0.0' );
    `;
    const expectedJson = {
      dependencies: ['react', 'wp-editor'],
      version: '2.0.0'
    };
    expect(parsePhpAssetFile(formattedPhpContent)).toEqual(expectedJson);
  });
});
