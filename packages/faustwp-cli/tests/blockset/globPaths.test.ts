import fs from 'fs-extra';
import os from 'os';
import path from 'path';

// Brackets are glob syntax, so a project path containing them used to match
// nothing. Windows paths hit the same problem through their `\` separators.
describe('blockset in a project path with glob characters', () => {
	let tmpDir: string;
	let blockset: typeof import('../../src/blockset');

	beforeEach(() => {
		tmpDir = fs.realpathSync(
			fs.mkdtempSync(path.join(os.tmpdir(), 'faust-blockset-')),
		);
		const projectDir = path.join(tmpDir, 'site [v1]');
		fs.ensureDirSync(projectDir);
		jest.spyOn(process, 'cwd').mockReturnValue(projectDir);

		jest.isolateModules(() => {
			blockset = require('../../src/blockset');
		});

		const blockDir = path.join(blockset.FAUST_BUILD_DIR, 'my-block');
		fs.outputJsonSync(path.join(blockDir, 'block.json'), {
			name: 'faust/my-block',
		});
		fs.outputFileSync(path.join(blockDir, 'render.php'), '<?php');
	});

	afterEach(() => {
		jest.restoreAllMocks();
		fs.removeSync(tmpDir);
	});

	it('finds block.json files', async () => {
		await expect(blockset.fetchBlockFiles()).resolves.toEqual([
			path.join(blockset.FAUST_BUILD_DIR, 'my-block', 'block.json'),
		]);
	});

	it('removes PHP files from processed blocks', async () => {
		await blockset.processBlockFiles(await blockset.fetchBlockFiles());

		const destDir = path.join(blockset.BLOCKS_DIR, 'my-block');
		expect(fs.existsSync(path.join(destDir, 'block.json'))).toBe(true);
		expect(fs.existsSync(path.join(destDir, 'render.php'))).toBe(false);
	});
});
