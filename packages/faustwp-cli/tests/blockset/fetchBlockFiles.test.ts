import fs from 'fs-extra';
import os from 'os';
import path from 'path';

// A project path is data, not pattern syntax: `[1]` here stands in for any glob
// character a real checkout may contain, and for the `\` separators every
// Windows path is built from.
const PROJECT_DIR_NAME = 'my site[1]';

describe('blockset file discovery', () => {
	let projectDir: string;
	let cwdSpy: jest.SpyInstance<string, []>;

	beforeEach(async () => {
		const tmpDir = await fs.realpath(
			await fs.mkdtemp(path.join(os.tmpdir(), 'faust-blockset-')),
		);
		projectDir = path.join(tmpDir, PROJECT_DIR_NAME);
		await fs.ensureDir(projectDir);

		cwdSpy = jest.spyOn(process, 'cwd').mockReturnValue(projectDir);
		jest.resetModules();
	});

	afterEach(async () => {
		const tmpDir = path.dirname(projectDir);
		cwdSpy.mockRestore();
		await fs.remove(tmpDir);
	});

	async function seedCompiledBlock(buildDir: string): Promise<string> {
		const blockDir = path.join(buildDir, 'MyCustomBlock');
		await fs.ensureDir(blockDir);
		await fs.writeJson(path.join(blockDir, 'block.json'), {
			name: 'faust/my-custom-block',
		});
		await fs.writeFile(path.join(blockDir, 'render.php'), '<?php\n');

		return blockDir;
	}

	it('finds compiled block.json files when the project path contains glob syntax', async () => {
		const { FAUST_BUILD_DIR, fetchBlockFiles } = await import(
			'../../src/blockset'
		);
		const blockDir = await seedCompiledBlock(FAUST_BUILD_DIR);

		await expect(fetchBlockFiles()).resolves.toEqual([
			path.join(blockDir, 'block.json'),
		]);
	});

	it('removes PHP files from processed blocks when the project path contains glob syntax', async () => {
		const { BLOCKS_DIR, FAUST_BUILD_DIR, processBlockFiles } = await import(
			'../../src/blockset'
		);
		const blockDir = await seedCompiledBlock(FAUST_BUILD_DIR);

		await processBlockFiles([path.join(blockDir, 'block.json')]);

		const destDir = path.join(BLOCKS_DIR, 'MyCustomBlock');
		expect(await fs.pathExists(path.join(destDir, 'block.json'))).toBe(true);
		expect(await fs.pathExists(path.join(destDir, 'render.php'))).toBe(false);
	});
});
