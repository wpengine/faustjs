import fs from 'fs';
import os from 'os';
import path from 'path';

jest.mock('isomorphic-fetch', () => ({}));

import {
	DEFAULT_GLOBAL_STYLESHEET_PATH,
	generateGlobalStylesheet,
	getGlobalStylesheetPath,
} from '../../src/generateGlobalStylesheet';

describe('getGlobalStylesheetPath', () => {
	it('returns the default path without an --output flag', () => {
		expect(getGlobalStylesheetPath([])).toBe(DEFAULT_GLOBAL_STYLESHEET_PATH);
		expect(getGlobalStylesheetPath(['--skip-health-checks'])).toBe(
			DEFAULT_GLOBAL_STYLESHEET_PATH,
		);
	});

	it('reads the path from --output <path>', () => {
		expect(getGlobalStylesheetPath(['--output', 'styles/wp.css'])).toBe(
			'styles/wp.css',
		);
	});

	it('reads the path from --output=<path>', () => {
		expect(
			getGlobalStylesheetPath([
				'--skip-health-checks',
				'--output=styles/wp.css',
			]),
		).toBe('styles/wp.css');
	});

	it('returns undefined when --output has no value', () => {
		expect(getGlobalStylesheetPath(['--output'])).toBeUndefined();
		expect(getGlobalStylesheetPath(['--output='])).toBeUndefined();
		expect(
			getGlobalStylesheetPath(['--output', '--skip-health-checks']),
		).toBeUndefined();
	});

	it('puts globalStylesheet.css inside a folder path', () => {
		expect(getGlobalStylesheetPath(['--output', 'styles/'])).toBe(
			path.join('styles', 'globalStylesheet.css'),
		);
		expect(getGlobalStylesheetPath(['--output', os.tmpdir()])).toBe(
			path.join(os.tmpdir(), 'globalStylesheet.css'),
		);
	});
});

describe('generateGlobalStylesheet', () => {
	const envBackup = process.env;
	const cwdBackup = process.cwd();
	let tmpDir: string;

	beforeEach(() => {
		process.env = {
			...envBackup,
			NEXT_PUBLIC_WORDPRESS_URL: 'http://headless.local',
		};
		tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'faust-stylesheet-'));
		process.chdir(tmpDir);
		jest.spyOn(console, 'log').mockImplementation(() => {});
		global.fetch = jest.fn().mockResolvedValue({
			json: async () => ({ data: { globalStylesheet: 'body{color:red}' } }),
		}) as unknown as typeof fetch;
	});

	afterEach(() => {
		process.chdir(cwdBackup);
		fs.rmSync(tmpDir, { recursive: true, force: true });
		jest.restoreAllMocks();
	});

	afterAll(() => {
		process.env = envBackup;
	});

	it('writes globalStylesheet.css in the project root by default', async () => {
		await generateGlobalStylesheet();

		expect(
			fs.readFileSync(path.join(tmpDir, 'globalStylesheet.css'), 'utf8'),
		).toBe('body{color:red}');
	});

	it('writes to the --output path and creates missing directories', async () => {
		await generateGlobalStylesheet(['--output', 'styles/wp/global.css']);

		expect(
			fs.readFileSync(path.join(tmpDir, 'styles/wp/global.css'), 'utf8'),
		).toBe('body{color:red}');
		expect(fs.existsSync(path.join(tmpDir, 'globalStylesheet.css'))).toBe(
			false,
		);
	});

	it('exits with an error when --output has no value', async () => {
		const exit = jest.spyOn(process, 'exit').mockImplementation((() => {
			throw new Error('exit');
		}) as never);

		await expect(generateGlobalStylesheet(['--output'])).rejects.toThrow(
			'exit',
		);
		expect(exit).toHaveBeenCalledWith(1);
		expect(global.fetch).not.toHaveBeenCalled();
	});
});
