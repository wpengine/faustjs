import { spawnSync, SpawnSyncReturns } from 'child_process';
jest.mock('child_process');
import { hasYarn } from '../../src/utils/hasYarn.js';
jest.mock('../../src/utils/hasYarn.js', () => ({
  __esModule: true,
  hasYarn: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
}));

import { compileBlocks } from '../../src/blockset';

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
          '--verbose',
          '--',
          '--no-watch',
          '--webpack-src-dir=wp-blocks',
        ]),
        { encoding: 'utf8', shell: true, stdio: 'inherit' },
      );
    });
  });
});
